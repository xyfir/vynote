// Action creators
import { saveContent, toggleMarkForReload } from "../actions/documents/";
import { markForReload } from "../actions/explorer/tabs";

// Modules
import updateDocument from "../../lib/document/update";

export default function (store, data) {
    
    let state = store.getState();
    
    if (state.document.doc_id == data.doc) {
        store.dispatch(saveContent(
            update(state.document.content, data.changes)
        ));
        store.dispatch(toggleMarkForReload());
    }
    else if (data.doc in state.explorer.tabs.list) {
        store.dispatch(markForReload(data.doc));
    }
    
}