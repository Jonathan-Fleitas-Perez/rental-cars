import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { isAdministrator } from "@/lib/isAdministrator";
import { redirect } from "next/navigation";
import { AnalyticsChart } from "./components/AnalyticsChart";
import { Button } from "@/components/ui/button";
import { Euro, CalendarCheck, Car as CarIcon, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AnalyticsPage() {
  const { userId } = await auth();

  if (!isAdministrator(userId)) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    where: { status: "confirmed" },
    orderBy: { orderDate: "asc" },
  });

  const totalRevenue = orders.reduce((acc, order) => acc + Number(order.totalAmount), 0);
  const totalOrders = orders.length;
  
  const cars = await db.car.findMany();
  const publishedCars = cars.filter(c => c.isPublish).length;

  // Process data for charts (simplified)
  const chartData = orders.map(order => ({
    date: new Date(order.orderDate).toLocaleDateString(),
    amount: Number(order.totalAmount)
  }));

  // Process Top Cars
  const carStats = orders.reduce((acc: Record<string, { name: string, count: number }>, order) => {
    if (!acc[order.carId]) {
      acc[order.carId] = { name: order.carName, count: 0 };
    }
    acc[order.carId].count += 1;
    return acc;
  }, {});

  const topCars = Object.values(carStats)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return (
    <div className="p-6 lg:p-10 space-y-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">Business Intelligence</h1>
          <p className="text-muted-foreground font-medium">Real-time performance monitoring and fleet health</p>
        </div>
        <Button variant="outline" className="rounded-full font-bold border-primary/20 hover:bg-primary/5 transition-all">
            Download Report (CSV)
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden border-none bg-muted/30 shadow-none hover:bg-muted/50 transition-all">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Revenue</CardTitle>
            <Euro className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter">{totalRevenue.toLocaleString()}€</div>
            <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-green-500 bg-green-500/10 w-fit px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3" /> +12.4%
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-none bg-muted/30 shadow-none hover:bg-muted/50 transition-all">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Orders</CardTitle>
            <CalendarCheck className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter">{totalOrders}</div>
            <p className="text-[10px] font-medium text-muted-foreground mt-2 italic">Lifetime confirmed</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-none bg-muted/30 shadow-none hover:bg-muted/50 transition-all">
          <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Active Fleet</CardTitle>
            <CarIcon className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter">{publishedCars} <span className="text-lg text-muted-foreground/50">/ {cars.length}</span></div>
            <p className="text-[10px] font-medium text-muted-foreground mt-2">{((publishedCars/cars.length)*100).toFixed(0)}% utilization rate</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-none bg-muted/30 shadow-none hover:bg-muted/50 transition-all">
          <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Avg. Ticket</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black tracking-tighter">{totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(0) : 0}€</div>
            <p className="text-[10px] font-medium text-muted-foreground mt-2 italic">Per reservation average</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none bg-muted/20 shadow-none p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg font-black uppercase tracking-tighter">Revenue Growth</CardTitle>
          </CardHeader>
          <CardContent className="px-0 h-[400px]">
            <AnalyticsChart data={chartData} />
          </CardContent>
        </Card>

        <Card className="border-none bg-muted/20 shadow-none p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg font-black uppercase tracking-tighter">Top Performers</CardTitle>
          </CardHeader>
          <CardContent className="px-0 space-y-6">
            {topCars.length > 0 ? topCars.map((car, index) => (
              <div key={car.name} className="space-y-2">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span>{index + 1}. {car.name}</span>
                  <span className="text-primary">{car.count} Orders</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-primary" 
                        style={{ width: `${(car.count / totalOrders) * 100}%` }}
                    />
                </div>
              </div>
            )) : (
              <p className="text-center py-10 text-muted-foreground italic text-sm">No sales data yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
