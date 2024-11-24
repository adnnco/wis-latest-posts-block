import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { useEffect, useState } from 'react';

export default function Edit({ attributes, setAttributes }) {
    const { numberOfPosts } = attributes;
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`/wp-json/wis/v1/latest-posts?per_page=${numberOfPosts}`)
            .then((response) => response.json())
            .then((data) => setPosts(data));
    }, [numberOfPosts]);

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Settings', 'wis-latest-posts-block')}>
                    <RangeControl
                        label={__('Number of Posts', 'wis-latest-posts-block')}
                        value={numberOfPosts}
                        onChange={(value) => setAttributes({ numberOfPosts: value })}
                        min={1}
                        max={10}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...useBlockProps()}>
                {posts.map((post) => (
                    <div key={post.id}>
                        <h6>{post.title}</h6>
                    </div>
                ))}
            </div>
        </>
    );
}
