import React, { useContext, useEffect } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react'; 
import { models } from "powerbi-client";
import CommonContext from '../StateManagment/CommonContext';


const PowerBIPIESReports = () => {

    const {piesData,setSelectedTab} = useContext(CommonContext);

    useEffect(()=>{
        setSelectedTab("Pies")
    },[])


  

    return (
        <PowerBIEmbed
            embedConfig={{
                type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
                id: piesData.id,
                embedUrl: piesData.embedUrl,
                accessToken: localStorage.getItem("pieAcreToken"),
                tokenType: models.TokenType.Embed, // Use models.TokenType.Aad for SaaS embed
                settings: {
                    panes: {
                        filters: {
                            expanded: false,
                            visible: false
                        }
                    },
                    background: models.BackgroundType.Transparent,
                }
            }}

            cssClassName={"reportClass"}

            getEmbeddedComponent={(embeddedReport) => {
                window.report = embeddedReport;
            }}
        />
    )
}

export default PowerBIPIESReports
