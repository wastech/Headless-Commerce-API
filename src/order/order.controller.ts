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

  @Post(':orderId/orderItems')
  async createOrderItem(
    @Body() orderItemDto: OrderItemDto,
    @Param('orderId') orderId: string,
  ) {
    return this.orderService.createOrderItem(orderId, orderItemDto);
  }
}
