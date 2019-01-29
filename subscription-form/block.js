const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { TextControl, PanelBody } = wp.components;

registerBlockType( 'gutenberg-blocks/subscription-form', {
  title: 'Subscription Form',
  icon: 'feedback',
  category: 'widgets',
  attributes: {
    inputLabel: {
      type: 'string'
    },
    btnLabel: {
      type: 'string'
    },
    formAction: {
      type: 'string'
    },
  },
  edit( { attributes: { inputLabel, btnLabel, formAction }, setAttributes, isSelected } ) {
    return [
      isSelected && (
        <InspectorControls key="inspectorControls">
          <PanelBody title="Form Details" initialOpen>
            <TextControl
                type="text"
                label="Input Label"
                value={inputLabel}
                onChange={( nextLabel ) => {
                    setAttributes( { inputLabel: nextLabel } );
                }}
            />
            <TextControl
                type="text"
                label="Button Label"
                value={btnLabel}
                onChange={( nextLabel ) => {
                    setAttributes( { btnLabel: nextLabel } );
                }}
            />
            <TextControl
              type="url"
              label="Form Action"
              value={formAction}
              onChange={( nextUrl ) => {
                  setAttributes( { formAction: nextUrl } );
              }}
            />
          </PanelBody>
        </InspectorControls>
      ),
      <div class="subscription-form">
        <form action={ formAction }>
          <label className="subscription-form__inputLabel">{ inputLabel }</label>
          <div className="subscription-form__container">
            <input placeholder="Email Address" type="email" style={{ width: "75%", borderRadius: 0 }} />
            <button type="submit" className="subscription-form__button">{ btnLabel }</button>
          </div>
        </form>
      </div>
    ];
  },
  save( { attributes: { inputLabel, btnLabel, formAction } } ) {
    return (
      <div class="subscription-form">
        <form action={ formAction }>
          <label className="subscription-form__inputLabel">{ inputLabel }</label>
          <div className="subscription-form__container">
            <input placeholder="Email Address" type="email" style={{ width: "75%", borderRadius: 0 }} />
            <button type="submit" className="subscription-form__button">{ btnLabel }</button>
          </div>
        </form>
      </div>
    );
  },
} );
