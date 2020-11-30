import React from 'react'
import {ListItem} from 'react-native-elements';

export default function Prec({title, caseNum}: PrecProps) {
  return (
        <ListItem bottomDivider>
					<ListItem.Content>
						<ListItem.Title>{title}</ListItem.Title>
						<ListItem.Subtitle>{caseNum}</ListItem.Subtitle>
					</ListItem.Content>
				</ListItem>
  )
}

export interface PrecProps{
  title: string,
  caseNum: string
}
