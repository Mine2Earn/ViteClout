export default function TwitterFeed({ twttag }: { twttag: string }) {
    return (
        <a className="twitter-timeline" data-width="600" data-height="500" data-theme="dark" href={`https://twitter.com/${twttag}?ref_src=twsrc%5Etfw`}>
            Tweets by ${twttag}
        </a>
    );
}
