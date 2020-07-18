import React, { useState } from 'react';

const App = () => {
    const [obj, setObj] = useState(fillTestData())
    const [signIsPlus, setSign] = useState(true)

    function fillTestData() {
        let keys = ['date', 'number', 'string'];
        let data = [];
        let getRand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
        let randDate = () => new Date(Math.floor(now + Math.random() * (end_date - now))).toLocaleString();
        let getRandString = function () {
            let ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = "";
            for (let j = 0; j < 10; j++) {
                result += ch.charAt(Math.floor(Math.random() * ch.length));
            }
            return result;
        };
        let now = Date.now();
        let end_date = now + (86400000 * 365 * 2);
        for (let i = 0; i < 10; i++) {
            data.push(
                [
                    randDate(),
                    getRand(1111, 99999),
                    getRandString()
                ]
            );
        }
        return {
            keys: keys,
            data: data
        }
    }

    const onSort = (sortText) => {
        let result;
        switch (sortText) {
            case 'date':
                signIsPlus === true
                    ? result = obj.data.sort((a, b) => {
                        return new Date(new Date(onFormatDate(b[0]))) - new Date(onFormatDate(a[0]))
                    })
                    : result = obj.data.sort((a, b) => {
                        return new Date(new Date(onFormatDate(a[0]))) - new Date(onFormatDate(b[0]))
                    })
                break;
            case 'number':
                signIsPlus === true
                    ? result = obj.data.sort((a, b) => b[1] - a[1])
                    : result = obj.data.sort((a, b) => a[1] - b[1])
                break;
            case 'string':
                function descendingSort(a, b) {
                    if (a[2] < b[2])
                        return -1;
                    if (a[2] > b[2])
                        return 1;
                    return 0;
                }

                function ascendingSort(a, b) {
                    if (a[2] > b[2])
                        return -1;
                    if (a[2] < b[2])
                        return 1;
                    return 0;
                }

                signIsPlus === true
                    ? result = obj.data.sort(descendingSort)
                    : result = obj.data.sort(ascendingSort)
                break;
        }
        setObj({ ...obj, result });
        setSign(!signIsPlus);
    }

    const onFormatDate = (str) => {
        let newString = str.split(', ')

        let year = newString[0].split('.')[2]
        let month = newString[0].split('.')[1]
        let date = newString[0].split('.')[0]
        let time = str.split(', ')[1]

        return `${year}-${month}-${date}T${time}`
    }

    return (
        <table border="1">
            <thead>
                <tr>
                    {obj.keys.map((elem, index) => {
                        return (
                            <th
                                key={index}
                                onClick={() => onSort(elem)}
                            >
                                {elem}
                            </th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {obj.data.map((elem, index) => {
                    return (
                        <tr key={index}>
                            <td>{elem[0]}</td>
                            <td>{elem[1]}</td>
                            <td>{elem[2]}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default App;