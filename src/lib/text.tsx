import React, { Fragment, createElement, useEffect, useState } from "react"

export const Text = (props: any) => {
    return <>{props?.value??'&ZeroWidthSpace;'}</>
}