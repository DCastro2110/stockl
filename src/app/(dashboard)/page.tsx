import {
  Header,
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from '../_components/common/header';
import { MoreSoldedProductsCard } from './_components/more-solded-products-card';
import { TodaysRevenueCard } from './_components/todays-revenue-card';
import { TotalInStockCard } from './_components/total-in-stock-card';
import { TotalProductsCard } from './_components/total-products-card';
import { TotalRevenueCard } from './_components/total-revenue-card';
import { TotalSalesCard } from './_components/total-sales-card';
import { TotalSalesInLast14DaysCard } from './_components/total-sales-in-last-14-days-card';

const Dashboard = async () => {
  return (
    <div className='p-8'>
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Dashboard</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>
      <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-2 gap-4'>
          <TotalRevenueCard />
          <TodaysRevenueCard />
        </div>

        <div className='grid grid-cols-3 gap-4'>
          <TotalSalesCard />
          <TotalInStockCard />
          <TotalProductsCard />
        </div>
        <div className='grid grid-cols-3 gap-4'>
          <TotalSalesInLast14DaysCard />
          <MoreSoldedProductsCard />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
