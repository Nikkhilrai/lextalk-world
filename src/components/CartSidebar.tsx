"use client";

import { X, Minus, Plus, Trash2, Tag, ShieldCheck, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CartSidebar() {
    const { items, isOpen, closeCart, updateQuantity, removeItem, total, itemCount } = useCart();
    const [promoCode, setPromoCode] = useState("");
    const router = useRouter();

    const handleCheckout = () => {
        closeCart();
        router.push("/checkout");
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
                onClick={closeCart}
            />

            {/* Sidebar */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                        <ShoppingCart size={20} className="text-slate-700" />
                        <h2 className="text-lg font-bold text-slate-900">
                            Cart <span className="text-slate-500 font-normal">({itemCount} {itemCount === 1 ? "item" : "items"})</span>
                        </h2>
                    </div>
                    <button
                        onClick={closeCart}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <ShoppingCart size={48} className="text-slate-300 mb-4" />
                            <p className="text-slate-500 font-medium">Your cart is empty</p>
                            <p className="text-sm text-slate-400 mt-1">Add a pass to get started</p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100"
                            >
                                {/* Item Image */}
                                {item.image && (
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                {/* Item Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="font-semibold text-slate-900 text-sm truncate">
                                            {item.name}
                                        </h3>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="p-1 hover:bg-slate-200 rounded transition-colors flex-shrink-0"
                                        >
                                            <Trash2 size={14} className="text-slate-400" />
                                        </button>
                                    </div>
                                    <p className="text-slate-600 font-medium text-sm mt-1">
                                        ${item.price.toLocaleString()}.00
                                    </p>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-1 border border-slate-200 rounded-lg bg-white">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1.5 hover:bg-slate-100 rounded-l-lg transition-colors"
                                            >
                                                <Minus size={14} className="text-slate-500" />
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium text-slate-900">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1.5 hover:bg-slate-100 rounded-r-lg transition-colors"
                                            >
                                                <Plus size={14} className="text-slate-500" />
                                            </button>
                                        </div>
                                        <p className="text-slate-900 font-bold text-sm">
                                            ${(item.price * item.quantity).toLocaleString()}.00
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-slate-200 p-4 space-y-4 bg-white">
                        {/* Promo Code */}
                        <div className="flex items-center gap-2">
                            <Tag size={16} className="text-slate-400" />
                            <input
                                type="text"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                placeholder="Enter a promo code"
                                className="flex-1 text-sm border-none outline-none text-slate-700 placeholder:text-slate-400"
                            />
                        </div>

                        {/* Total */}
                        <div className="flex items-center justify-between py-3 border-t border-slate-100">
                            <div>
                                <p className="font-bold text-slate-900">Estimated total</p>
                                <p className="text-xs text-slate-500">Taxes and shipping are calculated at checkout.</p>
                            </div>
                            <p className="text-xl font-bold text-slate-900">
                                ${total.toLocaleString()}.00
                            </p>
                        </div>

                        {/* Checkout Buttons */}
                        <button
                            onClick={handleCheckout}
                            className="w-full py-3.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                        >
                            Checkout
                        </button>
                        <button
                            onClick={closeCart}
                            className="w-full py-3 bg-white text-slate-900 font-semibold rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-colors"
                        >
                            View Cart
                        </button>

                        {/* Secure Badge */}
                        <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
                            <ShieldCheck size={16} />
                            <span>Secure Checkout</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
