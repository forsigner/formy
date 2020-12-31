/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import clsx from 'clsx'
import AnnouncementBar from '@theme/AnnouncementBar'
import Navbar from '@theme/Navbar'
import Footer from '@theme/Footer'
import LayoutProviders from '@theme/LayoutProviders'
import LayoutHead from '@theme/LayoutHead'
import { Helmet } from 'react-helmet'
import { Formy } from '@formy/core'
import { FormyUnstyled } from '@formy/unstyled'

import type { Props } from '@theme/Layout'

// import { ThemeProvider, useTheme } from '@styli/theming';

import './styles.css'

Formy.use(FormyUnstyled)

function Layout(props: Props): JSX.Element {
  const { children, noFooter, wrapperClassName } = props
  return (
    <LayoutProviders>
      <LayoutHead {...props} />

      <Helmet>
        <script>
          {`
        var _hmt = _hmt || []
        ;(function () {
          var hm = document.createElement('script')
          hm.src = 'https://hm.baidu.com/hm.js?bc7597713547ac9d7bf332e56bb854df'
          var s = document.getElementsByTagName('script')[0]
          s.parentNode.insertBefore(hm, s)
        })()
      `}
        </script>
      </Helmet>

      <AnnouncementBar />
      <Navbar />
      <div className={clsx('main-wrapper', wrapperClassName)}>{children}</div>

      {!noFooter && <Footer />}
    </LayoutProviders>
  )
}

export default Layout
