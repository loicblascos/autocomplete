import getInstance from '../helpers/getInstance';

const instance = getInstance();
const clear = instance.components.Clear.element;

describe( 'clear method', function() {

	describe( 'with input value', () => {

		beforeEach( () => {

			instance.element.value = 'item';
			instance.options.onClear = jest.fn();
			instance.update();

		} );

		it( 'clear once', () => {

			instance.clear();

			expect( instance.options.onClear ).toHaveBeenCalledTimes( 1 );
			expect( document.body.contains( clear ) ).toBe( false );

		} );

		it( 'clear several times', () => {

			instance.clear();
			instance.clear();
			instance.clear();

			expect( instance.options.onClear ).toHaveBeenCalledTimes( 1 );
			expect( document.body.contains( clear ) ).toBe( false );

		} );

		it( 'is clearable', () => {

			instance.options.clearable = true;
			instance.update();

			expect( document.body.contains( clear ) ).toBe( true );

		} );

		it( 'is not clearable', () => {

			instance.options.clearable = false;
			instance.update();

			expect( document.body.contains( clear ) ).toBe( false );

		} );
	} );

	describe( 'without input value', () => {

		beforeEach( () => {

			instance.element.value = '';
			instance.options.onClear = jest.fn();
			instance.update();

		} );

		it( 'clear once', () => {

			instance.clear();

			expect( instance.options.onClear ).toHaveBeenCalledTimes( 0 );
			expect( document.body.contains( clear ) ).toBe( false );

		} );

		it( 'clear several times', () => {

			instance.clear();
			instance.clear();
			instance.clear();

			expect( instance.options.onClear ).toHaveBeenCalledTimes( 0 );
			expect( document.body.contains( clear ) ).toBe( false );

		} );

		it( 'is clearable', () => {

			instance.options.clearable = true;
			instance.update();

			expect( document.body.contains( clear ) ).toBe( false );

		} );

		it( 'is not clearable', () => {

			instance.options.clearable = false;
			instance.update();

			expect( document.body.contains( clear ) ).toBe( false );

		} );
	} );
} );
