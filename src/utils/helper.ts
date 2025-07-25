import {
    APPROVER_ASSIGNMENTS_LINK,
    APPROVERS_LINK,
    AUTO_DEPOSIT_LINK,
    BULK_DEPOSIT_LINK,
    DASHBOARD_LINK,
    DEPOSIT_OVERVIEW_LINK,
    MANUAL_DEPOSIT_LINK,
    MANUAL_WITHDRAW_LINK,
    MERCHANTS_LINK,
    PAYMENT_REPORTS_LINK,
    SETTINGS_LINK,
    UPLOAD_LOGS_LINK
} from "./constant";

export const SIDEBAR_DATA_LIST = [
    {
        title: "Dashboard",
        icon: "dashboard",
        path: DASHBOARD_LINK,
    },
    {
        title: "User Management",
        icon: "usermanagement",
        tabData: [
            {
                title: "Merchants",
                icons: "merchants",
                path: MERCHANTS_LINK,
            },
            {
                title: "Approvers",
                icons: "approvers",
                path: APPROVERS_LINK,
            },
        ]
    },
    {
        title: "Approver Assignments",
        icon: "approverassignment",
        path: APPROVER_ASSIGNMENTS_LINK,
    },
    {
        title: "Upload-Logs (Bank/UPI)",
        icon: "upload",
        path: UPLOAD_LOGS_LINK,
    },
    {
        title: "Deposits Overview",
        icon: "depositsoverview",
        path: DEPOSIT_OVERVIEW_LINK,
    },
    {
        title: "Reports",
        icon: "reports",
        tabData: [
            {
                title: "Auto Deposit",
                icons: "settings",
                path: AUTO_DEPOSIT_LINK,
            },
            {
                title: "Manual Deposit",
                icons: "manualdeposit",
                path: MANUAL_DEPOSIT_LINK,
            },
            {
                title: "Manual Withdraw",
                icons: "manualwhitdraw",
                path: MANUAL_WITHDRAW_LINK,
            },
        ]
    },
    {
        title: "Bulk Deposit",
        icon: "bulkDeposit",
        path: BULK_DEPOSIT_LINK,
    },
    {
        title: "Payment Reports",
        icon: "paymentreports",
        path: PAYMENT_REPORTS_LINK,
    },
    {
        title: "Settings",
        icon: "settings",
        path: SETTINGS_LINK,
    },
    {
        title: "Sign Out",
        icon: "signout",
        path: "/",
    },
];




export const TOADY_SALES_DATA_LIST = [
    {
        title: "₹4.5 Lakh",
        bgColor: "bg-yellow-green",
        icon: "greenchat",
        heading: "Approved Today",
        des: "0,5% from yesterday",
    },
    {
        title: "800",
        bgColor: "bg-blue-chalk",
        icon: "pinkthreearrow",
        heading: "Total Request",
        des: "0,5% from yesterday",
    },
    {
        title: "20%",
        bgColor: "bg-white-titan",
        icon: "bluerightclick",
        heading: "Request Approved",
        des: "30 Mins Approving Accuracy",
    },
    {
        title: "5",
        bgColor: "bg-white-ice",
        icon: "greennotification",
        heading: "Active Approvers",
        des: "+8% from yesterday",
    },
    {
        title: "300",
        bgColor: "bg-yellow-wish",
        icon: "ornagehome",
        heading: "Active Merchants",
        des: "+8% from yesterday",
    },
]