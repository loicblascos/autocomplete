/* eslint-disable */
// https://developer.mozilla.org/fr/docs/Web/API/Element/matches
if ( ! Element.prototype.matches ) {
	Element.prototype.matches = Element.prototype.msMatchesSelector;
}
