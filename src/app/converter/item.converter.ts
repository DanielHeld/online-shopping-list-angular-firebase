import {DocumentData} from "@angular/fire/compat/firestore";
import {Item} from "../model/item";

export function fireDocToItem(doc: DocumentData) {
  return new Item(doc.id, doc.data().name);
}
