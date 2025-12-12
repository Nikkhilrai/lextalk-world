"use server";

import { BetaAnalyticsDataClient } from "@google-analytics/data";

const PROPERTY_ID = "515935052";

// Initialize the client with service account credentials
const credentials = {
    client_email: "analytics-reader@lextalk-world.iam.gserviceaccount.com",
    private_key: process.env.GOOGLE_ANALYTICS_PRIVATE_KEY?.replace(/\\n/g, '\n') || "",
};

const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials,
});

export interface AnalyticsData {
    activeUsers: number;
    pageViews: number;
    sessions: number;
    newUsers: number;
    topPages: { page: string; views: number }[];
    topCountries: { country: string; users: number }[];
    deviceCategories: { device: string; users: number }[];
}

export async function getAnalyticsData(): Promise<{ success: boolean; data: AnalyticsData | null; error?: string }> {
    try {
        // Get basic metrics for last 30 days
        const [metricsResponse] = await analyticsDataClient.runReport({
            property: `properties/${PROPERTY_ID}`,
            dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
            metrics: [
                { name: "activeUsers" },
                { name: "screenPageViews" },
                { name: "sessions" },
                { name: "newUsers" },
            ],
        });

        // Get top pages
        const [pagesResponse] = await analyticsDataClient.runReport({
            property: `properties/${PROPERTY_ID}`,
            dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
            dimensions: [{ name: "pagePath" }],
            metrics: [{ name: "screenPageViews" }],
            limit: 10,
            orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        });

        // Get top countries (increased limit to 10)
        const [countriesResponse] = await analyticsDataClient.runReport({
            property: `properties/${PROPERTY_ID}`,
            dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
            dimensions: [{ name: "country" }],
            metrics: [{ name: "sessions" }],
            limit: 10,
            orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        });

        // Get device categories
        const [devicesResponse] = await analyticsDataClient.runReport({
            property: `properties/${PROPERTY_ID}`,
            dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
            dimensions: [{ name: "deviceCategory" }],
            metrics: [{ name: "sessions" }],
            orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        });

        const metrics = metricsResponse.rows?.[0]?.metricValues || [];

        const topPages = (pagesResponse.rows || []).map(row => ({
            page: row.dimensionValues?.[0]?.value || "/",
            views: parseInt(row.metricValues?.[0]?.value || "0"),
        }));

        const topCountries = (countriesResponse.rows || []).map(row => ({
            country: row.dimensionValues?.[0]?.value || "Unknown",
            users: parseInt(row.metricValues?.[0]?.value || "0"),
        }));

        const deviceCategories = (devicesResponse.rows || []).map(row => ({
            device: row.dimensionValues?.[0]?.value || "Unknown",
            users: parseInt(row.metricValues?.[0]?.value || "0"),
        }));

        return {
            success: true,
            data: {
                activeUsers: parseInt(metrics[0]?.value || "0"),
                pageViews: parseInt(metrics[1]?.value || "0"),
                sessions: parseInt(metrics[2]?.value || "0"),
                newUsers: parseInt(metrics[3]?.value || "0"),
                topPages,
                topCountries,
                deviceCategories,
            },
        };
    } catch (error: any) {
        console.error("Failed to fetch analytics:", error);
        return {
            success: false,
            data: null,
            error: error.message || "Failed to fetch analytics data",
        };
    }
}

export async function getRealTimeUsers(): Promise<{ success: boolean; count: number }> {
    try {
        const [response] = await analyticsDataClient.runRealtimeReport({
            property: `properties/${PROPERTY_ID}`,
            metrics: [{ name: "activeUsers" }],
        });

        const count = parseInt(response.rows?.[0]?.metricValues?.[0]?.value || "0");
        return { success: true, count };
    } catch (error) {
        console.error("Failed to fetch realtime users:", error);
        return { success: false, count: 0 };
    }
}

