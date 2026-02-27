import React, { useMemo, useState } from "react";
import { cn } from "../lib/utils";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/basic-ui";
import {
  BarChart3,
  Calculator,
  CreditCard,
  Eye,
  Heart,
  History,
  Send,
  Shield,
  ShoppingCart,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";

import BrowseListings from "../components/BrowseListings";
import BuyCredits from "../components/BuyCredits";
import OffsetCalculator from "../components/OffsetCalculator";
import Overview from "../components/Overview";
import PriceAnalytics from "../components/PriceAnalytics";
import RatingsReviews from "../components/RatingsReviews";
import SellCredits from "../components/SellCredits";
import TransactionHistory from "../components/TransactionHistory";
import TransferCredits from "../components/TransferCredits";
import Watchlist from "../components/Watchlist";

const tabs = [
  {
    id: "browse",
    label: "Browse",
    icon: Eye,
    component: BrowseListings,
    description: "Browse verified marketplace listings",
  },
  {
    id: "buy",
    label: "Buy",
    icon: ShoppingCart,
    component: BuyCredits,
    description: "Purchase credits with smart settlement",
  },
  {
    id: "sell",
    label: "Sell",
    icon: CreditCard,
    component: SellCredits,
    description: "List your holdings with flexible pricing",
  },
  {
    id: "transfer",
    label: "Transfer",
    icon: Send,
    component: TransferCredits,
    description: "Move credits across wallets and users",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    component: PriceAnalytics,
    description: "Track trend signals and market depth",
  },
  {
    id: "history",
    label: "History",
    icon: History,
    component: TransactionHistory,
    description: "Audit your complete transaction activity",
  },
  {
    id: "watchlist",
    label: "Watchlist",
    icon: Heart,
    component: Watchlist,
    description: "Monitor assets and active alerts",
  },
  {
    id: "calculator",
    label: "Calculator",
    icon: Calculator,
    component: OffsetCalculator,
    description: "Estimate and offset your footprint",
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: Star,
    component: RatingsReviews,
    description: "Compare seller reputation and trust",
  },
];

const summaryCards = [
  {
    label: "Market Price",
    value: "$23.76",
    delta: "+1.4% in 24h",
  },
  {
    label: "Daily Volume",
    value: "108.2K",
    delta: "31 countries active",
  },
  {
    label: "Open Listings",
    value: "1,247",
    delta: "142 newly verified",
  },
];

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState("browse");

  const activeTabConfig = useMemo(
    () => tabs.find((tab) => tab.id === activeTab) ?? tabs[0],
    [activeTab],
  );

  const ActiveComponent = activeTabConfig.component;

  return (
    <div className="relative min-h-screen pb-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-200/60 blur-3xl" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-cyan-200/60 blur-3xl" />
      </div>

      <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        <section className="glass-panel animate-fade-up rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <Badge className="inline-flex bg-brand-100 text-brand-800">
                <Sparkles className="mr-1.5 h-3 w-3" />
                Live Carbon Exchange
              </Badge>
              <h1 className="font-display text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
                Carbon Credit Marketplace
              </h1>
              <p className="text-sm text-slate-600 sm:text-base">
                Discover, trade, and track verified carbon credits with
                transparent pricing and measurable climate impact.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                <TrendingUp className="mr-1 h-3 w-3" />
                Market Active
              </Badge>
              <Button variant="outline" size="sm">
                <Shield className="mr-2 h-4 w-4" />
                Blockchain Verified
              </Button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
            {summaryCards.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200/70 bg-white/85 p-4"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-brand-700">{stat.delta}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 animate-fade-up [animation-delay:100ms]">
          <Overview />
        </section>

        <section className="mt-6 animate-fade-up [animation-delay:180ms]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="glass-panel rounded-2xl p-2">
              <TabsList className="flex gap-2 overflow-x-auto pb-1 lg:grid lg:grid-cols-9 lg:overflow-visible lg:pb-0">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className={cn(
                        "group min-w-[132px] flex-1 rounded-xl px-3 py-3 text-left transition-all",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2",
                        isActive
                          ? "bg-brand-100 text-brand-900 shadow-card"
                          : "bg-transparent text-slate-600 hover:bg-slate-100/90 hover:text-slate-900",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-semibold">{tab.label}</span>
                      </div>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-6">
              <Card className="rounded-3xl">
                <CardHeader className="space-y-2 pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <activeTabConfig.icon className="h-5 w-5 text-brand-700" />
                    <span>{activeTabConfig.label}</span>
                  </CardTitle>
                  <p className="text-sm text-slate-600">
                    {activeTabConfig.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ActiveComponent />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default Marketplace;
