import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Wifi,
  Coffee,
  ShowerHead,
  Snowflake,
  Tv,
  Lock,
  CheckCircle,
  Verified,
  Check,
  X,
  Calendar,
  CreditCard,
  Home,
  Menu,
  Search,
  ShoppingCart,
  Star,
  User,
  LogOut,
  Settings,
  CircleHelp,
  Info,
  CircleX,
  TriangleAlert,
  Plus,
  Minus,
  Edit,
  Delete,
  Image,
  Map,
  MapPin as MapPinIcon,
  Send,
  Eye,
  Package,
  Boxes,
  FileText,
  StickyNote,
  Ban,
  Globe,
  Bed,
  Users,
  Car,
  ZoomIn,
  Loader2,
  ShoppingBag,
  Shield,
  Zap,
  Group,
  Utensils,
  CarFront,
  Warehouse,
  Bell,
  ChefHat,
  Download,
  Wallet,
  LayoutDashboard,
  PlusCircle,
  AlertCircle,
  RefreshCw,
  Filter,
  ArrowUpDown,
  MoreVertical,
  AlertTriangle,
} from "lucide-react";

export type IconName =
  | "facebook"
  | "instagram"
  | "twitter"
  | "youtube"
  | "call"
  | "mail"
  | "location_on"
  | "arrow_forward"
  | "chevron_left"
  | "chevron_right"
  | "chevron_up"
  | "chevron_down"
  | "wifi"
  | "free_breakfast"
  | "shower"
  | "ac_unit"
  | "tv"
  | "lock"
  | "check_circle"
  | "verified"
  | "verified_user"
  | "close"
  | "calendar"
  | "calendar_month"
  | "credit_card"
  | "expand_more"
  | "progress_activity"
  | "home"
  | "menu"
  | "search"
  | "shopping_cart"
  | "star"
  | "user"
  | "logout"
  | "settings"
  | "help"
  | "info"
  | "error"
  | "warning"
  | "add"
  | "remove"
  | "edit"
  | "delete"
  | "image"
  | "map"
  | "near_me"
  | "publish"
  | "visibility"
  | "inventory"
  | "inventory_2"
  | "edit_note"
  | "article"
  | "sticky_note_2"
  | "shield"
  | "block"
  | "public"
  | "hotel"
  | "group"
  | "payments"
  | "directions_car"
  | "person"
  | "zoom_in"
  | "arrow_back"
  | "bolt"
  | "groups"
  | "restaurant"
  | "concierge"
  | "local_parking"
  | "room_service"
  | "download"
  | "account_balance_wallet"
  | "calendar_today"
  | "place";

const iconMap: Record<string, any> = {
  call: Phone,
  mail: Mail,
  location_on: MapPin,
  arrow_forward: ArrowRight,
  chevron_left: ChevronLeft,
  chevron_right: ChevronRight,
  chevron_up: ChevronUp,
  chevron_down: ChevronDown,
  wifi: Wifi,
  free_breakfast: Coffee,
  shower: ShowerHead,
  ac_unit: Snowflake,
  tv: Tv,
  lock: Lock,
  check_circle: CheckCircle,
  verified: Verified,
  verified_user: Check,
  settings: Settings,
  help: CircleHelp,
  info: Info,
  error: CircleX,
  warning: TriangleAlert,
  add: Plus,
  remove: Minus,
  edit: Edit,
  delete: Delete,
  image: Image,
  map: Map,
  near_me: MapPinIcon,
  publish: Send,
  visibility: Eye,
  inventory: Package,
  inventory_2: Boxes,
  edit_note: FileText,
  article: FileText,
  sticky_note_2: StickyNote,
  shield: Shield,
  block: Ban,
  public: Globe,
  hotel: Bed,
  group: Users,
  payments: CreditCard,
  directions_car: Car,
  person: User,
  zoom_in: ZoomIn,
  arrow_back: ChevronLeft,
  bolt: Zap,
  groups: Group,
  restaurant: Utensils,
  concierge: Bell,
  local_parking: CarFront,
  room_service: ChefHat,
  download: Download,
  account_balance_wallet: Wallet,
  calendar_today: Calendar,
  place: MapPinIcon,
  dashboard: LayoutDashboard,
  add_circle: PlusCircle,
  alert: AlertCircle,
  refresh: RefreshCw,
  filter_list: Filter,
  sort: ArrowUpDown,
  more_vert: MoreVertical,
  expand_more: ChevronDown,
  cancel: CircleX,
  facebook: () => (
    <svg className="lucide-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  instagram: () => (
    <svg className="lucide-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  twitter: () => (
    <svg className="lucide-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  ),
  youtube: () => (
    <svg className="lucide-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  ),
};

interface IconProps {
  name: IconName;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const IconComponent = iconMap[name];
  if (!IconComponent) {
    return null;
  }
  return <IconComponent className={className} />;
}

export {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Wifi,
  Coffee,
  ShowerHead,
  Snowflake,
  Tv,
  Lock,
  CheckCircle,
  Verified,
  Check,
  X,
  Calendar,
  CreditCard,
  Home,
  Menu,
  Search,
  ShoppingCart,
  Star,
  User,
  LogOut,
  Settings,
  CircleHelp,
  Info,
  CircleX,
  TriangleAlert,
  Plus,
  Minus,
  Edit,
  Delete,
  Image,
  Map,
  MapPinIcon,
  Send,
  Eye,
  Package,
  Boxes,
  FileText,
  StickyNote,
  Ban,
  Globe,
  Bed,
  Users,
  Car,
  ZoomIn,
  Loader2,
  ShoppingBag,
  Shield,
  LayoutDashboard,
  PlusCircle,
  AlertCircle,
  RefreshCw,
  Filter,
  ArrowUpDown,
  MoreVertical,
};
