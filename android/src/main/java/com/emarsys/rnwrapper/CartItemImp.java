package com.emarsys.rnwrapper;

import com.emarsys.predict.api.model.CartItem;

public class CartItemImp implements CartItem {

    private String itemId;
    private double price;
    private double quantity;

    public CartItemImp(String itemId, double price, double quantity) {
        this.itemId = itemId;
        this.price = price;
        this.quantity = quantity;
    }

    @Override
    public String getItemId() {
        return itemId;
    }

    @Override
    public double getPrice() {
        return price;
    }

    @Override
    public double getQuantity() {
        return quantity;
    }
}
