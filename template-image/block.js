const { registerBlockType } = wp.blocks;
const { MediaUpload, BlockControls, ColorPalette, InspectorControls } = wp.editor;
const { Button, TextControl, PanelBody } = wp.components;

registerBlockType( 'gutenberg-blocks/template-image', {
    title: 'Template Image',
    icon: 'index-card',
	category: 'layout',
    attributes: {
        mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
        },
        color: {
            type: 'string',
        },
        templateName: {
            type: 'string',
        },
        templateURL: {
            type: 'string',
            source: 'attribute',
			selector: 'a',
			attribute: 'href',
        },
    },
    edit( { attributes: { color, mediaID, mediaURL, templateURL, templateName }, setAttributes, isSelected } ) {
        const onSelectImage = ( media ) => {
			setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
			} );
        };
        return [
            isSelected && (
                <BlockControls key="controls">
                    <ColorPalette
                        colors={color}
                        onChange={( nextColor ) => {
                            setAttributes( { color: nextColor } );
                        }}
                    />
                </BlockControls>
            ),
            isSelected && (
                <InspectorControls key="inspectorControls">
                    <PanelBody title="Template Details" initialOpen>
                        <TextControl
                            type="text"
                            label="Template Name"
                            value={templateName}
                            onChange={( nextName ) => {
                                setAttributes( { templateName: nextName } );
                            }}
                        />
                        <TextControl
                            type="url"
                            label="Template URL"
                            value={templateURL}
                            onChange={( nextUrl ) => {
                                setAttributes( { templateURL: nextUrl } );
                            }}
                        />
                    </PanelBody>
                </InspectorControls>
            ),
            <div className="template-image__container" style={{ backgroundColor: color }}>
                <MediaUpload
                    onSelect={ onSelectImage }
                    allowedTypes="image"
                    value={ mediaID }
                    render={ ( { open } ) => (
                        <Button className={ mediaID ? 'image-button' : 'button button-large' } onClick={ open }>
                            { ! mediaID ? 'Upload Image' : <img src={ mediaURL } alt={ 'Upload Image' } /> }
                        </Button>
                    ) }
                />
            </div>
        ];
    },
    save( { attributes: { mediaID, mediaURL, color, templateURL, templateName } } ) {
        return (
			<div className="imageWrapper">
				{
					mediaURL && (
                        <figure id={ mediaID } class="template-image__figure" style={{ backgroundColor: color }}>
                            <a href={ templateURL } className="template-image__link">
                                <img src={ mediaURL } alt={ templateName } className="template-image__image" />
                                <span className="template-image__button">Use this template</span>
                            </a>
                        </figure>
                    )
				}
			</div>
		);
    },
});