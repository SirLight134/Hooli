/**
 * Converts text string into a URL-friendly slug.
 */
export const generateSlug = (text: string): string => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

/**
 * Calculates skip offset and sanitized limit for Mongoose/SQL queries.
 */
export const paginate = (page: number = 1, limit: number = 10) => {
    const safePage = Math.max(1, Math.floor(page));
    const safeLimit = Math.max(1, Math.floor(limit));
    return {
        skip: (safePage - 1) * safeLimit,
        limit: safeLimit,
    };
};

/**
 * Generates a unique, readable order reference number.
 */
export const generateOrderNumber = (): string => {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `ORD-${timestamp}-${randomSuffix}`;
};

/**
 * Formats a numeric price into localized currency string.
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount);
};

/**
 * Calculates final price after applying a percentage discount.
 */
export const calculateDiscountedPrice = (price: number, discountPercentage: number): number => {
    if (discountPercentage <= 0) return price;
    const discount = (price * Math.min(discountPercentage, 100)) / 100;
    return Number((price - discount).toFixed(2));
};

/**
 * Sanitizes user input string by stripping basic HTML tags.
 */
export const sanitizeString = (str: string): string => {
    return str.replace(/<[^>]*>?/gm, '').trim();
};
