import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DashBoardEntries, fadeInAnimation, MainModelService, Business, Tables, Stock,
  Branch, CalculateTotalClassPipe, RoundNumberPipe, Order, OrderDetails,
   Variant, Product } from '@enexus/flipper-components';
import { trigger, transition, useAnimation } from '@angular/animations';
import { ModelService } from '@enexus/flipper-offline-database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('insertDashboard', [
      transition(':enter', useAnimation(fadeInAnimation, { params: { duration: '1s' } }))
    ]),
  ],
})
export class DashboardComponent implements OnInit, AfterViewInit {


  dashboardEntries: DashBoardEntries;


  public branch: Branch | null;
  public totalStore = 0.00;
  public netProfit = 0.00;
  public grossProfits = 0.00;
  public totalRevenue = 0.00;

  public topSoldItem = [];
  public lowStockItem=[];
  public currency = this.model.active<Business>(Tables.business) ? this.model.active<Business>(Tables.business).currency : 'RWF';
  constructor(private totalPipe: CalculateTotalClassPipe,
              private radomNumberPipe: RoundNumberPipe,
              private query: ModelService, private model: MainModelService) {
    this.branch = this.model.active<Branch>(Tables.branch);
    this.totalStore = this.getStockValue();
    this.netProfit = this.getNetProfit();
    this.totalRevenue = this.getTotalRevenues();
    this.grossProfits = this.getGrossProfit();
    this.topSoldItem = this.topSoldItems();
    this.lowStockItem = this.getLowStocks();

  }

  ngOnInit(): void {
    this.totalRevenue = this.getTotalRevenues();
    this.totalStore = this.getStockValue();
    this.netProfit = this.getNetProfit();
    this.grossProfits = this.getGrossProfit();
    this.lowStockItem = this.getLowStocks();
    this.topSoldItem = this.topSoldItems();
  }

  ngAfterViewInit(): void {
    this.totalRevenue = this.getTotalRevenues();
    this.totalStore = this.getStockValue();
    this.netProfit = this.getNetProfit();
    this.grossProfits = this.getGrossProfit();
    this.lowStockItem = this.getLowStocks();
    this.topSoldItem = this.topSoldItems();
  }

  topSoldItems() {
    const topSolds=[];
    if(this.sales().length > 0) {
      this.sales().forEach(sale=> {
        if(this.topSoldsItem(sale.id).length > 0) {
          this.topSoldsItem(sale.id).forEach((item: OrderDetails,i)=> {
            if(item.quantity) {
              const x= {
                id: i+1,
                name: item.variantName,
                updatedAt: 'Updated 5m ago',
                items: item.quantity,
                total: item.subTotal
              };
              topSolds.push(x);
            }

          });
        }
      });
   }

    return topSolds;
  }


  getStockValue() {
    return this.radomNumberPipe.transform(this.stockValue());
  }
  stockValue() {
    const stocks: Stock[] = this.stocks();
    const results = [{ retailPrice: 0 }];

    if (stocks.length > 0) {
      stocks.forEach(result => {
        results.push({ retailPrice: result.currentStock * result.retailPrice });
      });
    }

    return this.totalPipe.transform(results, 'retailPrice');

  }
  grossProfit() {
    const stocks = this.getSaleStocks();
    return this.totalPipe.transform(stocks, 'retailPrice');
  }

  getGrossProfit() {
    return this.radomNumberPipe.transform(this.grossProfit());
  }


  getNetProfit() {
    return this.radomNumberPipe.transform(this.grossProfit() - this.salesStockCostPrice());
  }

  salesStockCostPrice() {
    const stocks = this.getSaleStocks();
    return this.totalPipe.transform(stocks, 'supplyPrice');
  }

  totalRevenues() {
    const sales: Order[] =this.sales();
    return this.totalPipe.transform(sales, 'subTotal');
  }
  getTotalRevenues() {
    return this.radomNumberPipe.transform(this. totalRevenues());
  }

  stocks() {
    return this.query.queries<Stock>(Tables.stocks, ` branchId=${this.branch.id} AND currentStock > 0 AND canTrackingStock=true`);
  }

  sales() {
    return this.query.queries<Order>(Tables.order, ` branchId=${this.branch.id} AND orderType='sales' AND status='complete'`);
  }

  getLowStocks() {
    const lowStocks=[];
    const stocks: Stock[]=this.query.queries<Stock>(Tables.stocks, ` branchId=${this.branch.id} AND canTrackingStock=true  ORDER BY currentStock ASC`);
    stocks.forEach((stock,i)=> {
      if(i < 6) {
        if(stock.lowStock && stock.currentStock < stock.lowStock) {
          const variant=this.model.find<Variant>(Tables.variants,stock.variantId);
          const product=this.model.find<Product>(Tables.products,variant.productId);
          lowStocks.push({
            id: stock.id,
            name: variant.name==='Regular'?product.name:variant.name,
            updatedAt: stock.updatedAt,
            currentStock: stock.currentStock
          });
        }
      }

    });
    return lowStocks;
  }

  getSaleStocks() {
    const stocks = [{ retailPrice: 0, supplyPrice: 0 }];
    this.sales().forEach(sale => {
      if (sale) {
        if (this.loadOrderDetails(sale.id).length > 0) {
          this.loadOrderDetails(sale.id).forEach(orderDetails => {
            if (orderDetails.stockId > 0) {
              const stock: Stock = this.model.find<Stock>(Tables.stocks, orderDetails.stockId);
              stocks.push({ retailPrice: orderDetails.quantity * stock.retailPrice,
                supplyPrice: orderDetails.quantity * stock.supplyPrice });
            }
          });
        }
      }
    });
    return stocks;
  }

  loadOrderDetails(orderId: number) {
    return this.model.filters<OrderDetails>(Tables.orderDetails, 'orderId', orderId);
  }

  topSoldsItem(orderId: number): OrderDetails[] {
    return this.query.row<OrderDetails>(Tables.orderDetails, `id,variantName,sum(quantity) as quantity,sum(subTotal) as subTotal`
    ,` id!='undefined' AND orderId=${orderId} GROUP BY variantName ORDER BY quantity DESC `);
  }
}