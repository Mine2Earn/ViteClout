import { useEffect, useState } from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

export default function TwitterFeed({ twttag }: { twttag: string }) {
    // Caution while touching this, highly toxic
    /**
     * TwitterFeed don't refresh if props change so we have to remove then remount the component
     * TODO: Find a cleaner way
     */
    let [Feed, setFeed] = useState(
        <TwitterTimelineEmbed options={{ width: '600', height: '800' }} theme="dark" sourceType="profile" screenName={twttag}></TwitterTimelineEmbed>
    );

    useEffect(() => {
        setTimeout(() => {
            setFeed(<></>);
            setTimeout(() => {
                setFeed(<TwitterTimelineEmbed options={{ width: '600', height: '800' }} theme="dark" sourceType="profile" screenName={twttag}></TwitterTimelineEmbed>);
            }, 1);
        }, 1);
    }, [twttag]);
    // Caution while touching this, highly toxic

    return Feed;
}
