import { Response, Request } from "express";
import { AuthRequest } from "../middleware/auth";
import { OrderModel } from "../models/orderModel";
import { PlantModel } from "../models/plantModel";
import { sendOrderConfirmationEmail } from "../utils/sendEmail"; 
import PDFDocument from "pdfkit";

export const placeOrder = async (req: AuthRequest, res: Response) => {
  try {
    console.log("Order Request Body:", req.body); 

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    const { customerName, shippingAddress, phone, items, totalAmount } = req.body;

    for (const item of items) {
      const plant = await PlantModel.findById(item.plantId); 
      
      if (!plant) {
        return res.status(404).json({ message: `Plant with ID ${item.plantId} not found!` });
      }

      if (plant.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${plant.name}` });
      }

      plant.stock -= item.quantity;
      await plant.save();
    }

    const newOrder = new OrderModel({
      userId: req.user.sub,
      customerName,
      shippingAddress,
      phone,
      items,
      totalAmount,
      invoiceNumber: "INV-" + Date.now() + Math.floor(Math.random() * 1000)
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({ message: "Order placed successfully!", data: savedOrder });

  } catch (err: any) {
    console.error("Backend Error Details:", err); 
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
};
export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const myOrders = await OrderModel.find({ userId: req.user.sub }).sort({ createdAt: -1 });

    res.status(200).json({ message: "ok", data: myOrders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch your orders" });
  }
};

export const getAllOrders = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized! Please login first." });
    }

    const orders = await OrderModel.find().sort({ createdAt: -1 });
    
    res.status(200).json({ message: "ok", data: orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};

export const cancelOrder = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;

    const order = await OrderModel.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found..!" });
    }

    if (order.userId.toString() !== req.user.sub) {
      return res.status(403).json({ message: "Forbidden! You can only cancel your own orders." });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({ message: `Cannot cancel order! It is already ${order.status}.` });
    }

    order.status = "Cancelled";
    const updatedOrder = await order.save();

    res.status(200).json({ 
      message: "Order cancelled successfully..!", 
      data: updatedOrder 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to cancel order", error: err });
  }
};

export const updateOrderDetails = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params; 
    const { shippingAddress, phone } = req.body; 

    const order = await OrderModel.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found..!" });
    }

    if (order.userId.toString() !== req.user.sub) {
      return res.status(403).json({ message: "Forbidden! You can only update your own orders." });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({ message: `Cannot update order details! It is already ${order.status}.` });
    }

    if (shippingAddress) order.shippingAddress = shippingAddress;
    if (phone) order.phone = phone;

    const updatedOrder = await order.save();

    res.status(200).json({ 
      message: "Order details updated successfully..!", 
      data: updatedOrder 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update order details", error: err });
  }
};

export const downloadInvoice = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=Invoice-${order.invoiceNumber}.pdf`);

    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    doc.pipe(res);

    // 1. Header Section
    doc.fillColor("#1b5e20").fontSize(30).font('Helvetica-Bold').text("GreenMart", 50, 50);
    doc.fillColor("#666666").fontSize(10).font('Helvetica').text("123, Plant Avenue, Colombo", 50, 85);
    
    doc.fillColor("#333333").fontSize(12).font('Helvetica-Bold').text(`INVOICE: ${order.invoiceNumber}`, 400, 50, { align: "right" });
    doc.fontSize(10).font('Helvetica').text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 400, 65, { align: "right" });

    // 2. Billing Info
    doc.moveDown(2);
    doc.fillColor("#1b5e20").fontSize(14).font('Helvetica-Bold').text("BILL TO:");
    doc.fillColor("#424242").fontSize(11).font('Helvetica').text(`${order.customerName}`);
    doc.text(`${order.shippingAddress}`);
    doc.text(`Tel: ${order.phone}`);

    // 3. Table Header
    let y = 220;
    doc.rect(50, y, 500, 25).fill("#1b5e20");
    doc.fillColor("#ffffff").fontSize(11).font('Helvetica-Bold');
    doc.text("Item Name", 60, y + 7);
    doc.text("Qty", 320, y + 7, { width: 50, align: "center" });
    doc.text("Price", 390, y + 7, { width: 70, align: "right" });
    doc.text("Total", 470, y + 7, { width: 70, align: "right" });

    // 4. Table Rows
    y += 35;
    order.items.forEach((item: any) => {
      doc.fillColor("#333333").fontSize(10).font('Helvetica');
      doc.text(item.name, 60, y);
      doc.text(item.quantity.toString(), 320, y, { width: 50, align: "center" });
      doc.text(`Rs.${item.price}.00`, 390, y, { width: 70, align: "right" });
      doc.text(`Rs.${item.quantity * item.price}.00`, 470, y, { width: 70, align: "right" });
      y += 25;
    });

    // 5. Total
    doc.moveTo(50, y).lineTo(550, y).strokeColor("#cccccc").stroke();
    y += 15;
    doc.font('Helvetica-Bold').fontSize(14).text(`GRAND TOTAL: Rs.${order.totalAmount}.00`, 50, y, { align: "right" });

    // 6. Footer
    doc.fontSize(9).fillColor("#777777").text("Thank you for choosing GreenMart! We hope your plants grow well.", 50, 750, { align: "center" });

    doc.end();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "PDF generation failed", error: error.message });
  }
};