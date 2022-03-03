import React from "react";

export class SimpleTable extends React.Component {
    render() {
        console.log("%%%%SimpleTable%%%%", this.props.content)
        return (
            <table className="table dataTable table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        {Object.keys(contentAttribute).map((item, idx) => <th key={idx}>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Alfreds Futterkiste</td>
                        <td>Maria Anders</td>
                        <td>Germany</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Centro comercial Moctezuma</td>
                        <td>Francisco Chang</td>
                        <td>Mexico</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Centro comercial Moctezuma</td>
                        <td>Francisco Chang</td>
                        <td>Mexico</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        );
    }
}


const contentAttribute = {
    Name: "Name",
    Createdby: "Createdby",
    Lastedited: "Lastedited",
    Type: "Type",
    Createddate: "Createddate",
    status: "status"
}