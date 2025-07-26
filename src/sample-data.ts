export interface IOption {
  option_id: string;
  option_label: string;
  has_group: boolean;
}

export interface ISection {
  section_id: string;
  section_label: string;
  options: IOption[];
}

export interface IGroup {
  group_title: string;
  group_id: string;
  sections: ISection[];
  path: {
    group_id: string;
    group_label: string;
  }[];
}

export const SAMPLE_DATA: Record<string, IGroup> = {
  root: {
    group_id: "root",
    group_title: "E-commerce Platform Settings",
    path: [],
    sections: [
      {
        section_id: "main_categories",
        section_label: "Main Categories",
        options: [
          {
            option_id: "store_settings_group",
            option_label: "Store Settings",
            has_group: true,
          },
          {
            option_id: "payment_group",
            option_label: "Payment Methods",
            has_group: true,
          },
          {
            option_id: "shipping_group",
            option_label: "Shipping Options",
            has_group: true,
          },
          {
            option_id: "tax_group",
            option_label: "Tax Settings",
            has_group: true,
          },
          {
            option_id: "notifications_group",
            option_label: "Notifications",
            has_group: true,
          },
          {
            option_id: "admin_users_group",
            option_label: "Admin Users",
            has_group: true,
          },
        ],
      },
    ],
  },

  store_settings_group: {
    group_id: "store_settings_group",
    group_title: "Store Settings",
    path: [{ group_id: "root", group_label: "E-commerce Platform Settings" }],
    sections: [
      {
        section_id: "general_info",
        section_label: "General Information",
        options: [
          {
            option_id: "store_name",
            option_label: "Store Name",
            has_group: false,
          },
          {
            option_id: "store_description",
            option_label: "Store Description",
            has_group: false,
          },
          {
            option_id: "store_logo",
            option_label: "Store Logo",
            has_group: false,
          },
        ],
      },
      {
        section_id: "appearance",
        section_label: "Appearance",
        options: [
          {
            option_id: "theme_group",
            option_label: "Theme Settings",
            has_group: true,
          },
          {
            option_id: "custom_css",
            option_label: "Custom CSS",
            has_group: false,
          },
        ],
      },
      {
        section_id: "localization",
        section_label: "Localization",
        options: [
          {
            option_id: "locale_group",
            option_label: "Locale Settings",
            has_group: true,
          },
          {
            option_id: "currency",
            option_label: "Default Currency",
            has_group: false,
          },
        ],
      },
    ],
  },

  theme_group: {
    group_id: "theme_group",
    group_title: "Theme Settings",
    path: [
      { group_id: "root", group_label: "E-commerce Platform Settings" },
      { group_id: "store_settings_group", group_label: "Store Settings" },
    ],
    sections: [
      {
        section_id: "color_scheme",
        section_label: "Color Scheme",
        options: [
          {
            option_id: "primary_color",
            option_label: "Primary Color",
            has_group: false,
          },
          {
            option_id: "secondary_color",
            option_label: "Secondary Color",
            has_group: false,
          },
          {
            option_id: "background_color",
            option_label: "Background Color",
            has_group: false,
          },
        ],
      },
      {
        section_id: "font_settings",
        section_label: "Font Settings",
        options: [
          {
            option_id: "font_family",
            option_label: "Font Family",
            has_group: false,
          },
          {
            option_id: "font_size",
            option_label: "Font Size",
            has_group: false,
          },
        ],
      },
    ],
  },

  locale_group: {
    group_id: "locale_group",
    group_title: "Locale Settings",
    path: [
      { group_id: "root", group_label: "E-commerce Platform Settings" },
      { group_id: "store_settings_group", group_label: "Store Settings" },
    ],
    sections: [
      {
        section_id: "language_options",
        section_label: "Language Options",
        options: [
          {
            option_id: "default_language",
            option_label: "Default Language",
            has_group: false,
          },
          {
            option_id: "enable_multilanguage",
            option_label: "Enable Multilanguage",
            has_group: false,
          },
        ],
      },
      {
        section_id: "timezone_settings",
        section_label: "Timezone Settings",
        options: [
          {
            option_id: "default_timezone",
            option_label: "Default Timezone",
            has_group: false,
          },
        ],
      },
    ],
  },

  payment_group: {
    group_id: "payment_group",
    group_title: "Payment Methods",
    path: [{ group_id: "root", group_label: "E-commerce Platform Settings" }],
    sections: [
      {
        section_id: "gateway_settings",
        section_label: "Gateway Settings",
        options: [
          { option_id: "paypal", option_label: "PayPal", has_group: false },
          { option_id: "stripe", option_label: "Stripe", has_group: false },
          { option_id: "razorpay", option_label: "Razorpay", has_group: false },
          {
            option_id: "cod",
            option_label: "Cash On Delivery",
            has_group: false,
          },
        ],
      },
      {
        section_id: "advanced_payment",
        section_label: "Advanced Payment Options",
        options: [
          {
            option_id: "payment_fees",
            option_label: "Payment Fees",
            has_group: false,
          },
          {
            option_id: "refund_policy_group",
            option_label: "Refund Policy",
            has_group: true,
          },
        ],
      },
    ],
  },

  refund_policy_group: {
    group_id: "refund_policy_group",
    group_title: "Refund Policy Settings",
    path: [
      { group_id: "root", group_label: "E-commerce Platform Settings" },
      { group_id: "payment_group", group_label: "Payment Methods" },
    ],
    sections: [
      {
        section_id: "refund_rules",
        section_label: "Refund Rules",
        options: [
          {
            option_id: "refund_window",
            option_label: "Refund Window (Days)",
            has_group: false,
          },
          {
            option_id: "restocking_fee",
            option_label: "Restocking Fee (%)",
            has_group: false,
          },
          {
            option_id: "refund_method_options",
            option_label: "Refund Methods",
            has_group: false,
          },
        ],
      },
    ],
  },

  shipping_group: {
    group_id: "shipping_group",
    group_title: "Shipping Options",
    path: [{ group_id: "root", group_label: "E-commerce Platform Settings" }],
    sections: [
      {
        section_id: "shipping_methods",
        section_label: "Shipping Methods",
        options: [
          {
            option_id: "standard_shipping",
            option_label: "Standard Shipping",
            has_group: false,
          },
          {
            option_id: "express_shipping",
            option_label: "Express Shipping",
            has_group: false,
          },
          {
            option_id: "free_shipping",
            option_label: "Free Shipping Over X Amount",
            has_group: false,
          },
        ],
      },
      {
        section_id: "carrier_settings",
        section_label: "Carrier Settings",
        options: [
          { option_id: "fedex", option_label: "FedEx", has_group: false },
          { option_id: "dhl", option_label: "DHL", has_group: false },
          { option_id: "ups", option_label: "UPS", has_group: false },
        ],
      },
    ],
  },

  tax_group: {
    group_id: "tax_group",
    group_title: "Tax Settings",
    path: [{ group_id: "root", group_label: "E-commerce Platform Settings" }],
    sections: [
      {
        section_id: "tax_rates",
        section_label: "Tax Rates",
        options: [
          { option_id: "vat", option_label: "VAT (%)", has_group: false },
          {
            option_id: "sales_tax",
            option_label: "Sales Tax (%)",
            has_group: false,
          },
          {
            option_id: "import_tax",
            option_label: "Import Tax (%)",
            has_group: false,
          },
        ],
      },
      {
        section_id: "tax_exemptions",
        section_label: "Tax Exemptions",
        options: [
          {
            option_id: "exempt_npos",
            option_label: "Exempt Non-Profits",
            has_group: false,
          },
          {
            option_id: "exempt_international",
            option_label: "Exempt International Sales",
            has_group: false,
          },
        ],
      },
    ],
  },

  notifications_group: {
    group_id: "notifications_group",
    group_title: "Notifications",
    path: [{ group_id: "root", group_label: "E-commerce Platform Settings" }],
    sections: [
      {
        section_id: "email_notifications",
        section_label: "Email Notifications",
        options: [
          {
            option_id: "order_confirmation",
            option_label: "Order Confirmation",
            has_group: false,
          },
          {
            option_id: "shipping_updates",
            option_label: "Shipping Updates",
            has_group: false,
          },
          {
            option_id: "promotional",
            option_label: "Promotional Emails",
            has_group: false,
          },
        ],
      },
      {
        section_id: "sms_notifications",
        section_label: "SMS Notifications",
        options: [
          {
            option_id: "order_status_sms",
            option_label: "Order Status Updates",
            has_group: false,
          },
          {
            option_id: "discount_offers_sms",
            option_label: "Discount Offers",
            has_group: false,
          },
        ],
      },
    ],
  },

  admin_users_group: {
    group_id: "admin_users_group",
    group_title: "Admin Users",
    path: [{ group_id: "root", group_label: "E-commerce Platform Settings" }],
    sections: [
      {
        section_id: "user_roles",
        section_label: "User Roles",
        options: [
          {
            option_id: "add_admin",
            option_label: "Add Administrator",
            has_group: false,
          },
          {
            option_id: "remove_admin",
            option_label: "Remove Administrator",
            has_group: false,
          },
          {
            option_id: "edit_permissions",
            option_label: "Edit Permissions",
            has_group: false,
          },
        ],
      },
      {
        section_id: "activity_logs",
        section_label: "Activity Logs",
        options: [
          {
            option_id: "view_logs",
            option_label: "View Logs",
            has_group: false,
          },
          {
            option_id: "download_logs",
            option_label: "Download Logs",
            has_group: false,
          },
        ],
      },
    ],
  },
};
