export function calculateCartTotal(items: { price: number, quantity: number }[]) {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return { totalItems, totalPrice }
}

export function calculateOrderTotal(items: { price: number, quantity: number }[]) {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function roundMoney(amount: number) {
    return Math.round(amount * 100) / 100
}

export function isValidObjectId(id: string) {
    return /^[0-9a-fA-F]{24}$/.test(id)
}

export function createslug(text: string) {
    return text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}

export function getPaginationParams(page = 1, limit = 10) {
    const skip = (page - 1) * limit
    return { page, limit }
}