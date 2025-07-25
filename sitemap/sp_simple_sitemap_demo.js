SalesforceInteractions.setLoggingLevel(100);

window.sfspCaptureEmail = function(value){
    SalesforceInteractions.sendEvent({ 
        interaction: { name: 'emailCapture' }, 
        user: { 
            attributes: { 
                eventType: 'contactPointEmail', 
                email: value
            }
        } 
    })
}

SalesforceInteractions.init({
    personalization: {
        dataspace: "default"
    },
    consents: [{
        purpose: SalesforceInteractions.ConsentPurpose.Tracking,
        provider: "Example Consent Manager",
        status: SalesforceInteractions.ConsentStatus.OptIn,
    }]
}).then(() => {
    const sitemapConfig = {
        global: {
            onActionEvent: (event) => { return event; }
        },
        pageTypeDefault: { 
            name: "default", 
            interaction: { 
                name: "default", 
                eventType: "webEngagement" 
            } 
        },
        pageTypes: [
            
        {
            name: "Home",
            
            isMatch: () => ["/"].includes(window.location.pathname),
            
            interaction: { 
                name: "home view",
                eventType: "websiteEngagement",
                
            }
        },

        {
            name: "PLP",
            
            isMatch: () => ["/category/woman/"].includes(window.location.pathname),
            
            interaction: { 
                name: "plp view",
                eventType: "websiteEngagement",
                
            }
        },

        {
            name: "PDP",
            
            isMatch: () => ["/product/prod_0001.html"].includes(window.location.pathname),
            
            interaction: { 
                name: "pdp view",
                eventType: "productEngagement",
                
                catalogObject: {
                    type: "Product",
                    id: () => {
                        switch(window.location.pathname){
                            
                            case "/product/prod_0001.html": return "PROD_0001"
                            default: return "unknown"
                        }
                    }
                },

            }
        },

        ],
    };

    SalesforceInteractions.initSitemap(sitemapConfig);

    /* === SPA Websites === */
    let currentUrl = window.location.href;

    setInterval(_ => {
        if (currentUrl !== window.location.href) {
            currentUrl = window.location.href;
            SalesforceInteractions.reinit();
        }
    }, 500);
});