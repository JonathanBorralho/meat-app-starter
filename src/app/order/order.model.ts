class Order {
  constructor(
    public address: string,
    public number: number,
    public paymentOption: string,
    public orderItems: OrderItem[] = [],
    public optionalAddress?: string
  ) {}
}

class OrderItem {
  constructor(public quantity: number, public menuId: string) {}
}

export {Order, OrderItem};
