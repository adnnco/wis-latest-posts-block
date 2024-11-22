import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { numberOfPosts } = attributes;
	return <div {...useBlockProps.save()} data-number-of-posts={numberOfPosts}></div>;
}
