import React, { useState } from "react";
import { cn } from "../../lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/basic-ui";
import {
  Search,
  Filter,
  Grid,
  List,
  MapPin,
  Calendar,
  Eye,
  Heart,
  Star,
  Shield,
  TrendingUp,
  Car,
  Trees,
  Sun,
  Wind,
  Droplets,
  Zap,
  Factory,
  Leaf,
} from "lucide-react";

// Asset icon mapping
const ASSET_ICONS = {
  EV: Car,
  Trees: Trees,
  Solar: Sun,
  Wind: Wind,
  Water: Droplets,
  Energy: Zap,
  Industrial: Factory,
  Forest: Leaf,
};

// Mock listings data
const mockListings = [
  {
    id: 1,
    title: "Tesla Model S EV Credits",
    description:
      "High-quality carbon credits from verified Tesla Model S usage",
    price: 23.45,
    quantity: 150,
    source: "EV",
    location: "California, USA",
    verification: "VCS",
    rating: 4.8,
    seller: "GreenTech Solutions",
    expiryDate: "2025-12-31",
    vintage: "2024",
    additionalInfo: "Premium EV credits with real-time tracking",
  },
  {
    id: 2,
    title: "Brazilian Rainforest Protection",
    description: "Forest conservation credits from protected Amazon areas",
    price: 31.2,
    quantity: 500,
    source: "Forest",
    location: "Amazon, Brazil",
    verification: "Gold Standard",
    rating: 4.9,
    seller: "Amazon Conservation Fund",
    expiryDate: "2026-06-30",
    vintage: "2024",
    additionalInfo: "Certified deforestation prevention",
  },
  {
    id: 3,
    title: "Solar Farm Credits",
    description:
      "Renewable energy credits from utility-scale solar installations",
    price: 18.75,
    quantity: 1000,
    source: "Solar",
    location: "Arizona, USA",
    verification: "Green-e",
    rating: 4.7,
    seller: "SunPower Corp",
    expiryDate: "2025-08-15",
    vintage: "2024",
    additionalInfo: "100% renewable solar energy",
  },
  {
    id: 4,
    title: "Wind Energy Portfolio",
    description: "Offshore wind farm credits with blockchain verification",
    price: 26.8,
    quantity: 750,
    source: "Wind",
    location: "North Sea, UK",
    verification: "REGO",
    rating: 4.6,
    seller: "WindPower Ltd",
    expiryDate: "2025-11-20",
    vintage: "2024",
    additionalInfo: "Offshore wind generation",
  },
  {
    id: 5,
    title: "Industrial Efficiency Credits",
    description: "Energy efficiency improvements in manufacturing",
    price: 21.3,
    quantity: 300,
    source: "Industrial",
    location: "Munich, Germany",
    verification: "TÜV",
    rating: 4.5,
    seller: "EcoManufacturing GmbH",
    expiryDate: "2025-09-10",
    vintage: "2024",
    additionalInfo: "Verified emission reductions",
  },
  {
    id: 6,
    title: "Water Conservation Credits",
    description: "Water saving and treatment facility credits",
    price: 19.9,
    quantity: 400,
    source: "Water",
    location: "California, USA",
    verification: "WQA",
    rating: 4.4,
    seller: "AquaTech Solutions",
    expiryDate: "2025-07-25",
    vintage: "2024",
    additionalInfo: "Water treatment and conservation",
  },
];

const BrowseListings = () => {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [priceSort, setPriceSort] = useState("asc");
  const [selectedListing, setSelectedListing] = useState(null);
  const [watchlist, setWatchlist] = useState(new Set());

  // Filter and sort listings
  const filteredListings = mockListings
    .filter((listing) => {
      const matchesSearch = listing.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesSource =
        sourceFilter === "all" || listing.source === sourceFilter;
      return matchesSearch && matchesSource;
    })
    .sort((a, b) => {
      if (priceSort === "asc") return a.price - b.price;
      if (priceSort === "desc") return b.price - a.price;
      return 0;
    });

  const toggleWatchlist = (listingId) => {
    const newWatchlist = new Set(watchlist);
    if (newWatchlist.has(listingId)) {
      newWatchlist.delete(listingId);
    } else {
      newWatchlist.add(listingId);
    }
    setWatchlist(newWatchlist);
  };

  const ListingCard = ({ listing, isListView = false }) => {
    const Icon = ASSET_ICONS[listing.source] || Leaf;
    const isWatched = watchlist.has(listing.id);

    return (
      <Card
        className={cn(
          "hover:shadow-lg transition-shadow",
          isListView ? "w-full" : "",
        )}
      >
        <CardHeader className={cn("pb-4", isListView ? "pb-2" : "")}>
          <div
            className={cn(
              "flex justify-between items-start",
              isListView ? "flex-row" : "flex-col space-y-2",
            )}
          >
            <div className={cn("flex items-center space-x-3", "flex-1")}>
              <div className="p-2 bg-green-100 rounded-lg">
                <Icon className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">{listing.title}</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  {listing.description}
                </p>
              </div>
            </div>
            <div className={cn("flex items-center space-x-2")}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleWatchlist(listing.id)}
                className={cn(
                  isWatched ? "text-red-500" : "text-gray-400",
                  "hover:text-red-500",
                )}
              >
                <Heart
                  className={cn("h-4 w-4", isWatched ? "fill-current" : "")}
                />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedListing(listing)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div
            className={cn(
              "grid gap-4",
              isListView ? "grid-cols-6" : "grid-cols-2",
            )}
          >
            <div>
              <p className="text-sm text-gray-600">Price</p>
              <p className="text-lg font-bold text-green-600">
                ${listing.price}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Quantity</p>
              <p className="font-semibold">{listing.quantity} credits</p>
            </div>
            {isListView && (
              <>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {listing.location}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Verification</p>
                  <Badge variant="secondary" className="text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    {listing.verification}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">{listing.rating}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Seller</p>
                  <p className="font-semibold text-xs">{listing.seller}</p>
                </div>
              </>
            )}
          </div>

          {!isListView && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Location:</span>
                <span className="text-sm flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {listing.location}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Verification:</span>
                <Badge variant="secondary" className="text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  {listing.verification}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rating:</span>
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-semibold">
                    {listing.rating}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-2 pt-2">
            <Button className="flex-1" size="sm">
              Buy Now
            </Button>
            <Button variant="outline" size="sm">
              Make Offer
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search carbon credits..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="EV">Electric Vehicle</SelectItem>
                  <SelectItem value="Solar">Solar Energy</SelectItem>
                  <SelectItem value="Wind">Wind Energy</SelectItem>
                  <SelectItem value="Forest">Forest Protection</SelectItem>
                  <SelectItem value="Industrial">Industrial</SelectItem>
                  <SelectItem value="Water">Water Conservation</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceSort} onValueChange={setPriceSort}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Price: Low to High</SelectItem>
                  <SelectItem value="desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredListings.length} results
        </p>
        <Badge variant="secondary">
          <TrendingUp className="h-3 w-3 mr-1" />
          Market Active
        </Badge>
      </div>

      {/* Listings Grid/List */}
      <div
        className={cn(
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            : "space-y-4",
        )}
      >
        {filteredListings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            isListView={viewMode === "list"}
          />
        ))}
      </div>

      {/* Listing Details Modal */}
      {selectedListing && (
        <Dialog
          open={!!selectedListing}
          onOpenChange={() => setSelectedListing(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  {React.createElement(
                    ASSET_ICONS[selectedListing.source] || Leaf,
                    { className: "h-5 w-5 text-green-600" },
                  )}
                </div>
                <span>{selectedListing.title}</span>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-gray-600">{selectedListing.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {selectedListing.additionalInfo}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Price:</span>
                      <span className="font-semibold text-green-600">
                        ${selectedListing.price}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quantity:</span>
                      <span>{selectedListing.quantity} credits</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vintage:</span>
                      <span>{selectedListing.vintage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expires:</span>
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {selectedListing.expiryDate}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Verification</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Standard:</span>
                      <Badge variant="secondary">
                        <Shield className="h-3 w-3 mr-1" />
                        {selectedListing.verification}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {selectedListing.location}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Seller:</span>
                      <span>{selectedListing.seller}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating:</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                        <span>{selectedListing.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4 border-t">
                <Button className="flex-1">Purchase Credits</Button>
                <Button variant="outline">Make Offer</Button>
                <Button
                  variant="ghost"
                  onClick={() => toggleWatchlist(selectedListing.id)}
                  className={cn(
                    watchlist.has(selectedListing.id)
                      ? "text-red-500"
                      : "text-gray-400",
                  )}
                >
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      watchlist.has(selectedListing.id) ? "fill-current" : "",
                    )}
                  />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default BrowseListings;
