// Document reducers
import note from "./note";
import page from "./page";
import code from "./code";

// Action types
import { SAVE_CONTENT, LOAD_CONTENT, SET_KEY } from "../../constants/action-types/documents/";

export default function (state, action) {
	let actionType = action.type.split('/');
	
	// Call appropriate reducers if action affects a document's state
	if (actionType[0] == "DOCUMENT") {
		// Action is for a specific type of document
		if (actionType.length > 2) {
			switch (actionType[1]) {
				case "NOTE":
					return note(state, action);
				case "PAGE":
					return page(state, action);
				case "CODE":
					return code(state, action);
				default:
					return state;
			}	
		}
		// Action can be handled here
		else {
			switch (action.type) {
				case SAVE_CONTENT:
					if (state.type != 1)
						return Object.assign({}, state, { content: action.data });
					else
						return state;
				case LOAD_CONTENT:
					return Object.assign({}, state, { content: action.content });
				case SET_KEY:
					if (state.encrypted)
						return Object.assign({}, state, { encrypt: action.key });
					else
						return state;
				default:
					return state;
			}
		}
	}
	else {
		return state;
	}
}