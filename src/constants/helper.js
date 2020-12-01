import React, { Component } from 'react'
import Responsive from 'react-responsive'

export const Mobile = (props) => <Responsive {...props} maxWidth={991} />;

export const Web    = (props) => <Responsive {...props} minWidth={991} />;

export const createProtocolRelativeURL = url => url.replace(/http(s?):/, '');