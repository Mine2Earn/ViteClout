import { useState } from 'react';

export default function TokenBalance() {
    let thead = [];
    const [body, setBody] = useState<string[][]>([]);

    return (
        <table>
            <thead>
                <th>Token ID</th>
                <th>Amount</th>
            </thead>
            <tbody>
                <tr>
                    <td>@elonmusk</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td>@ekazukii</td>
                    <td>6</td>
                </tr>
                <tr>
                    <td>@obstinatem</td>
                    <td>13</td>
                </tr>
            </tbody>
        </table>
    );
}
