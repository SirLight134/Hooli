export function formatPrice(price: number, currency = "EGP") {
    return new Intl.NumberFormat("en-EG", {
        style: "currency",
        currency,
    }).format(price)
}

export function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date)
}

export function formOrderId(id: string) {
    return `ORD-${id.slice(0, 10).toUpperCase()}`
}