import * as React from "react"
import { StoreContext, StoreProvider } from "./src/context/store-context"
import "./src/styles/reset.css"
import "./src/styles/variables.css"
import "./src/styles/global.css"
import { IntelligemsReactProvider, useIgTrack } from "@intelligems/headless/gatsby"


const InnerHoc = ({ children }) => {
  const { checkout } = React.useContext(StoreContext)
  useIgTrack({
    cartOrCheckoutToken: checkout?.id,
    currency: checkout.totalTaxV2?.currencyCode,
    // TODO - Get country from Shopify
    country: "US"
  })

  return children
}

export const wrapRootElement = ({ element }) => {
  console.log("ROOT")
  return <IntelligemsReactProvider organizationId={"f3c23a39-5512-4838-ac46-adcf5921baf0"}
                                   storefrontApiToken={process.env.GATSBY_STOREFRONT_ACCESS_TOKEN}
                                   antiFlicker={true}
  >
    <StoreProvider>
      <InnerHoc>
        {element}
      </InnerHoc>
    </StoreProvider>
  </IntelligemsReactProvider>
}
