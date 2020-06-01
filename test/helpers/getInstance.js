import AutoComplete from '../../src/js/autocomplete';
import explicitLabel from '../fixtures/explicitLabel';

document.body.innerHTML = explicitLabel;

export default function getIntance() {

	return new AutoComplete(
		document.querySelector( 'input' ),
		{
			source: [ 'item 1', 'item 2', 'item 3' ],
		},
	);

}
