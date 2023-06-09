import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Req,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderItemDto } from './dto/create.orderitem.dto';
import { OrderItemDto } from './dto/create-order.dto';
import { JwtPayload } from 'src/user/interfaces/jwt-payload.interface';
import { Order } from './entities/order.entity';
import { Public } from '../user/decorators/public.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Public()
  @Get()
  async getOrders(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.orderService.getOrders(page, limit);
  }
  @Delete(':orderId')
  async deleteOrder(
    @Param('orderId') orderId: string,
    @Req() req,
  ): Promise<void> {
    const userId = req.user.id; // Assuming you have implemented authentication

    await this.orderService.deleteOrder(orderId, userId);
  }

  @Post(':orderId/orderItems')
  async createOrderItem(
    @Body() orderItemDto: OrderItemDto,
    @Param('orderId') orderId: string,
  ) {
    return this.orderService.createOrderItem(orderId, orderItemDto);
  }

  @Get('/user/:userId')
  async getOrdersByUser(
    @Param('userId') userId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<any> {
    return this.orderService.getOrdersByUser(userId, page, limit);
  }
}
