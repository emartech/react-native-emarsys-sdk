import Emarsys, { type CartItem, Logic, Filter, type Product } from 'react-native-emarsys-sdk';
import { ScrollView, Button } from './Components';

let recommendedProducts: Product[] | null | undefined = undefined

export default function PredictScreen() {
  return (
    <ScrollView>
      <Button title="Track Cart" action={async () => {
        const items: CartItem[] = [
          { itemId: 'item1', price: 1.1, quantity: 1 },
          { itemId: 'item2', price: 2.2, quantity: 2 }
        ];
        await Emarsys.predict.trackCart(items);
      }} />
      <Button title="Track Purchase" action={async () => {
        const orderId = 'order1';
        const items: CartItem[] = [
          { itemId: 'item1', price: 1.1, quantity: 1 },
          { itemId: 'item2', price: 2.2, quantity: 2 }
        ];
        await Emarsys.predict.trackPurchase(orderId, items);
      }} />
      <Button title="Track Item View" action={async () => {
        const itemId = 'item1';
        await Emarsys.predict.trackItemView(itemId);
      }} />
      <Button title="Track Category View" action={async () => {
        const categoryPath = 'category1';
        await Emarsys.predict.trackCategoryView(categoryPath);
      }} />
      <Button title="Track Search Term" action={async () => {
        const searchTerm = 'search1';
        await Emarsys.predict.trackSearchTerm(searchTerm);
      }} />
      <Button title="Track Tag" action={async () => {
        const tag = 'tag1';
        const attributes = { k1: 'v1', k2: 'v2' };
        await Emarsys.predict.trackTag(tag, attributes);
      }} />
      <Button title="Recommend Products" action={async () => {
        const logic = Logic.home(['1', '2']);
        const filters = [Filter.exclude.isValue('field', 'value')];
        const limit = 5;
        const availabilityZone = 'en';
        recommendedProducts = await Emarsys.predict.recommendProducts(logic, filters, limit, availabilityZone);
        return JSON.stringify(recommendedProducts, undefined, 2);
      }} printResult />
      <Button title="Track Recommendation Click" action={async () => {
        if (recommendedProducts && recommendedProducts[0]) {
          await Emarsys.predict.trackRecommendationClick(recommendedProducts[0]);
          return recommendedProducts[0].productId;
        } else {
          return 'No recommended products. Call Recommend Products first.';
        }
      }} printResult />

    </ScrollView>
  );
}
