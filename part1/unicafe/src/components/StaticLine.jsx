const StaticLine = ({text, value}) => {
    return(
        <tbody>
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
        </tbody>
    );
}

export default StaticLine;