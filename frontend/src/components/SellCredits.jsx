import React, { useState } from "react";
import { cn } from "../lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Switch,
} from "./ui/basic-ui";
import {
  TrendingUp,
  Clock,
  Target,
  DollarSign,
  Package,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Edit,
  Trash2,
  Eye,
  Plus,
  BarChart3,
} from "lucide-react";

const SellCredits = () => {
  const [listingType, setListingType] = useState("market"); // 'market' or 'limit'
  const [activeTab, setActiveTab] = useState("create"); // 'create', 'active', 'portfolio'

  // Portfolio data
  const portfolioCredits = [
    {
      id: 1,
      type: "Solar Energy",
      quantity: 500,
      avgCost: 18.5,
      currentPrice: 23.45,
      totalValue: 11725,
      gain: 2475,
      gainPercent: 26.7,
      vintage: "2024",
      verification: "Green-e",
    },
    {
      id: 2,
      type: "Forest Conservation",
      quantity: 250,
      avgCost: 25.2,
      currentPrice: 31.2,
      totalValue: 7800,
      gain: 1500,
      gainPercent: 23.8,
      vintage: "2024",
      verification: "VCS",
    },
  ];

  // Active listings
  const activeListings = [
    {
      id: 1,
      title: "Premium Solar Credits - Batch #A123",
      type: "limit",
      quantity: 200,
      price: 25.0,
      marketPrice: 23.45,
      views: 145,
      created: "2024-01-15",
      expires: "2024-02-15",
      status: "active",
      autoRelist: true,
    },
    {
      id: 2,
      title: "Forest Carbon Credits - Verified",
      type: "market",
      quantity: 100,
      price: 31.2,
      marketPrice: 31.2,
      views: 89,
      created: "2024-01-18",
      expires: "2024-03-18",
      status: "active",
      autoRelist: false,
    },
  ];

  const [newListing, setNewListing] = useState({
    title: "",
    description: "",
    quantity: "",
    price: "",
    duration: "30",
    autoRelist: false,
    source: "",
  });

  const CreateListingForm = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-green-600" />
            <span>Create New Listing</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Listing Type */}
          <div>
            <Label className="text-base font-medium">Listing Type</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div
                className={cn(
                  "border rounded-lg p-4 cursor-pointer transition-colors",
                  listingType === "market"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:bg-gray-50",
                )}
                onClick={() => setListingType("market")}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Market Order</span>
                </div>
                <p className="text-sm text-gray-600">
                  Sell immediately at current market price
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Current: $23.45 per credit
                </p>
              </div>

              <div
                className={cn(
                  "border rounded-lg p-4 cursor-pointer transition-colors",
                  listingType === "limit"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:bg-gray-50",
                )}
                onClick={() => setListingType("limit")}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Limit Order</span>
                </div>
                <p className="text-sm text-gray-600">
                  Set your own price and wait for buyers
                </p>
                <p className="text-xs text-blue-600 mt-1">You set the price</p>
              </div>
            </div>
          </div>

          {/* Credit Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="source">Credit Source</Label>
              <Select
                value={newListing.source}
                onValueChange={(value) =>
                  setNewListing({ ...newListing, source: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select credit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solar">Solar Energy</SelectItem>
                  <SelectItem value="wind">Wind Energy</SelectItem>
                  <SelectItem value="forest">Forest Conservation</SelectItem>
                  <SelectItem value="ev">Electric Vehicle</SelectItem>
                  <SelectItem value="industrial">
                    Industrial Efficiency
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="quantity">Quantity (Credits)</Label>
              <Input
                id="quantity"
                type="number"
                value={newListing.quantity}
                onChange={(e) =>
                  setNewListing({ ...newListing, quantity: e.target.value })
                }
                placeholder="Enter quantity"
              />
            </div>
          </div>

          {/* Listing Details */}
          <div>
            <Label htmlFor="title">Listing Title</Label>
            <Input
              id="title"
              value={newListing.title}
              onChange={(e) =>
                setNewListing({ ...newListing, title: e.target.value })
              }
              placeholder="e.g., Premium Solar Energy Credits - Batch #A123"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newListing.description}
              onChange={(e) =>
                setNewListing({ ...newListing, description: e.target.value })
              }
              placeholder="Describe your carbon credits, including verification, vintage, and any special features..."
              rows={4}
            />
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">
                {listingType === "market" ? "Market Price" : "Your Price"} (per
                credit)
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={newListing.price}
                  onChange={(e) =>
                    setNewListing({ ...newListing, price: e.target.value })
                  }
                  className="pl-10"
                  placeholder={listingType === "market" ? "23.45" : "25.00"}
                  disabled={listingType === "market"}
                />
              </div>
              {listingType === "limit" && (
                <p className="text-xs text-gray-500 mt-1">
                  Market price: $23.45 (
                  {newListing.price
                    ? (((newListing.price - 23.45) / 23.45) * 100).toFixed(1)
                    : "0"}
                  % above market)
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="duration">Listing Duration</Label>
              <Select
                value={newListing.duration}
                onValueChange={(value) =>
                  setNewListing({ ...newListing, duration: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Day</SelectItem>
                  <SelectItem value="7">7 Days</SelectItem>
                  <SelectItem value="30">30 Days</SelectItem>
                  <SelectItem value="60">60 Days</SelectItem>
                  <SelectItem value="90">90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Auto Relist */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="auto-relist" className="font-medium">
                Auto-Relist
              </Label>
              <p className="text-sm text-gray-600">
                Automatically relist if not sold within the duration
              </p>
            </div>
            <Switch
              id="auto-relist"
              checked={newListing.autoRelist}
              onCheckedChange={(checked) =>
                setNewListing({ ...newListing, autoRelist: checked })
              }
            />
          </div>

          {/* Revenue Calculation */}
          {newListing.quantity && newListing.price && (
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-3">
                Revenue Calculation
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Gross Revenue:</span>
                  <span className="font-semibold">
                    ${(newListing.quantity * newListing.price).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee (3%):</span>
                  <span>
                    -$
                    {(newListing.quantity * newListing.price * 0.03).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Verification Fee:</span>
                  <span>-$5.00</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-green-700">
                  <span>Net Revenue:</span>
                  <span>
                    $
                    {(
                      newListing.quantity * newListing.price * 0.97 -
                      5
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <Button
              className="flex-1"
              disabled={!newListing.title || !newListing.quantity}
            >
              {listingType === "market" ? "Sell Now" : "Create Listing"}
            </Button>
            <Button variant="outline">Save as Draft</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ActiveListingsTab = () => (
    <div className="space-y-4">
      {activeListings.map((listing) => (
        <Card key={listing.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold">{listing.title}</h3>
                  <Badge
                    variant={
                      listing.type === "market" ? "default" : "secondary"
                    }
                  >
                    {listing.type === "market" ? "Market" : "Limit"}
                  </Badge>
                  <Badge
                    variant={
                      listing.status === "active" ? "default" : "secondary"
                    }
                    className="bg-green-100 text-green-700"
                  >
                    {listing.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Quantity:</span>
                    <p className="font-semibold">{listing.quantity} credits</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Your Price:</span>
                    <p className="font-semibold">${listing.price}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Market Price:</span>
                    <p className="font-semibold">${listing.marketPrice}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Views:</span>
                    <p className="font-semibold flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {listing.views}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Created: {listing.created}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Expires: {listing.expires}
                  </span>
                  {listing.autoRelist && (
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Auto-relist enabled
                    </span>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {listing.type === "limit" &&
              listing.price > listing.marketPrice && (
                <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center text-yellow-800">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      Your price is{" "}
                      {(
                        ((listing.price - listing.marketPrice) /
                          listing.marketPrice) *
                        100
                      ).toFixed(1)}
                      % above market. Consider lowering to increase visibility.
                    </span>
                  </div>
                </div>
              )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const PortfolioTab = () => (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Credits
                </p>
                <p className="text-2xl font-bold">750</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">$19,525</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Gain</p>
                <p className="text-2xl font-bold text-green-600">$3,975</p>
                <p className="text-sm text-green-600">+25.5%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Holdings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-green-600" />
            <span>Your Holdings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolioCredits.map((credit) => (
              <div
                key={credit.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-semibold">{credit.type}</h4>
                  <p className="text-sm text-gray-600">
                    {credit.verification} • Vintage {credit.vintage}
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-gray-600">Quantity</p>
                    <p className="font-semibold">{credit.quantity}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">Avg Cost</p>
                    <p className="font-semibold">${credit.avgCost}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">Current Price</p>
                    <p className="font-semibold">${credit.currentPrice}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">Gain/Loss</p>
                    <p className="font-semibold text-green-600">
                      +${credit.gain} ({credit.gainPercent}%)
                    </p>
                  </div>
                </div>

                <Button size="sm" className="ml-4">
                  Sell
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          className={cn(
            "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
            activeTab === "create"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900",
          )}
          onClick={() => setActiveTab("create")}
        >
          Create Listing
        </button>
        <button
          className={cn(
            "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
            activeTab === "active"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900",
          )}
          onClick={() => setActiveTab("active")}
        >
          Active Listings ({activeListings.length})
        </button>
        <button
          className={cn(
            "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
            activeTab === "portfolio"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900",
          )}
          onClick={() => setActiveTab("portfolio")}
        >
          Portfolio
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "create" && <CreateListingForm />}
      {activeTab === "active" && <ActiveListingsTab />}
      {activeTab === "portfolio" && <PortfolioTab />}
    </div>
  );
};

export default SellCredits;
