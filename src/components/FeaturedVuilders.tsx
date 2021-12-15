import VuildersGrid from './VuildersGrid';

export default function Title(props: any) {
    return (
        <>
            <p>Featured Vuilders</p>
            <VuildersGrid vuilders={['elonmusk', 'elonmusk', 'elonmusk', 'elonmusk']}></VuildersGrid>
        </>
    );
}
