import React, { useState } from "react";
import { cn } from "../lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/basic-ui";
import {
  ShoppingCart,
  TrendingUp,
  Eye,
  Star,
  Calculator,
  History,
  CreditCard,
  Send,
  Filter,
  BarChart3,
  Heart,
  Shield,
} from "lucide-react";

// Import marketplace components
import Overview from "../components/Marketplace/Overview";
import BrowseListings from "../components/Marketplace/BrowseListings";
import BuyCredits from "../components/Marketplace/BuyCredits";
import SellCredits from "../components/Marketplace/SellCredits";
import TransferCredits from "../components/Marketplace/TransferCredits";
import PriceAnalytics from "../components/Marketplace/PriceAnalytics";
import TransactionHistory from "../components/Marketplace/TransactionHistory";
import Watchlist from "../components/Marketplace/Watchlist";
import OffsetCalculator from "../components/Marketplace/OffsetCalculator";
import RatingsReviews from "../components/Marketplace/RatingsReviews";

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState("browse");

  const tabs = [
    {
      id: "browse",
      label: "Browse",
      icon: Eye,
      component: BrowseListings,
      description: "Browse available carbon credits",
    },
    {
      id: "buy",
      label: "Buy",
      icon: ShoppingCart,
      component: BuyCredits,
      description: "Purchase carbon credits",
    },
    {
      id: "sell",
      label: "Sell",
      icon: CreditCard,
      component: SellCredits,
      description: "List credits for sale",
    },
    {
      id: "transfer",
      label: "Transfer",
      icon: Send,
      component: TransferCredits,
      description: "Send credits to others",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      component: PriceAnalytics,
      description: "Market trends and analysis",
    },
    {
      id: "history",
      label: "History",
      icon: History,
      component: TransactionHistory,
      description: "Your transaction history",
    },
    {
      id: "watchlist",
      label: "Watchlist",
      icon: Heart,
      component: Watchlist,
      description: "Saved listings and alerts",
    },
    {
      id: "calculator",
      label: "Calculator",
      icon: Calculator,
      component: OffsetCalculator,
      description: "Calculate carbon offset needs",
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: Star,
      component: RatingsReviews,
      description: "Seller ratings and reviews",
    },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Carbon Credit Marketplace
                </h1>
                <p className="text-sm text-gray-600">
                  Trade verified carbon credits with transparency and trust
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                Market Active
              </Badge>
              <Button variant="outline" size="sm">
                <Shield className="h-4 w-4 mr-2" />
                Blockchain Verified
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="px-6 py-4">
        <Overview />
      </div>

      {/* Main Content */}
      <div className="px-6 pb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-9 mb-6 bg-white border border-gray-200 p-1 rounded-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={cn(
                    "flex flex-col items-center space-y-1 py-3 px-2 rounded-md transition-all relative",
                    activeTab === tab.id
                      ? "bg-green-100 text-green-700 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Tab Content */}
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <tab.icon className="h-5 w-5 text-green-600" />
                    <span>{tab.label}</span>
                  </CardTitle>
                  <p className="text-sm text-gray-600">{tab.description}</p>
                </CardHeader>
                <CardContent>
                  <tab.component />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Marketplace;
