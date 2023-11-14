import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';

const RankTree = () => {
    const [treeData, setTreeData] = useState([]);

    useEffect(() => {
        fetch('https://localhost:7205/api/Dashboard/GetRankHierarchy')
            .then(response => response.json())
            .then(data => {
                // Suponiendo que hay una jerarquía implícita y NameRank es el nivel más alto
                const hierarchy = data.reduce((acc, item) => {
                    let rank = acc.find(r => r.name === item.nameRank);
                    if (!rank) {
                        rank = { name: item.nameRank, children: [] };
                        acc.push(rank);
                    }
                    rank.children.push({
                        name: `${item.nameSubrank} (${item.studentCount} estudiantes)`
                    });
                    return acc;
                }, []);

                setTreeData(hierarchy);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // La propiedad 'translate' es para centrar el árbol en el contenedor.
    // 'scaleExtent' controla el zoom y 'zoom' el nivel inicial de zoom.
    const orgChartOptions = {
        translate: { x: window.innerWidth / 2, y: window.innerHeight / 10 },
        scaleExtent: { min: 0.1, max: 1 },
        zoom: 0.5
    };

    return (
        <div id="treeWrapper" style={{ width: '100%', height: '100vh' }}>
            {treeData.length > 0 && (
                <Tree data={treeData} orientation="vertical" {...orgChartOptions} />
            )}
        </div>
    );
};

export default RankTree;
