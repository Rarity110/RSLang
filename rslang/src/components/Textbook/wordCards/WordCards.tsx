import React, { Component } from 'react';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { IWordCard } from './consts';
import { ReactLearnWordsAPI } from '../../API/getWords';
import { WordCard } from '../WordCard/WordCard';

interface ICards {
  group: number;
  page: number;
}

export class WordCards extends Component<ICards> {
  reactLearnWordsAPI = new ReactLearnWordsAPI();
  state = {
    group: 1,
    page: 1,
    cards: [] as IWordCard[]
  };

  componentDidMount() {
    this.updateCards();
  }

  componentDidUpdate(prevProps: ICards) {
    if (this.props.page !== prevProps.page || this.props.group !== prevProps.group) {
      this.updateCards();
    }
  }

  updateCards() {
    const { page, group } = this.props;
    this.setState({
      page: page,
      group: group
    });
    this.reactLearnWordsAPI.getWords(group, page).then((words) => {
      this.setState({
        cards: words
      });
    });
  }
  // constructor(props: ICards) {
  //   super(props);
  //   const { group, page } = this.props;
  //   this.getWordsOnPage(group, page);
  // }

  // getWordsOnPage(group: number, page: number) {
  //   // console.log(group);
  //   // console.log(page);
  //   this.reactLearnWordsAPI.getWords(group, page).then((words) => {
  //     this.setState({
  //       cards: words,
  //       page: page,
  //       group: group
  //     });
  //   });
  // }

  render() {
    // const { page } = this.state;
    const cards = this.state.cards;
    return (
      <ImageList sx={{ width: 1500, height: 450 }}>
        {cards.map((item: IWordCard) => (
          <ImageListItem key={item.image}>
            <WordCard id={item.id} />
            {/* <img
              src={`${item.image}?w=248&fit=crop&auto=format`}
              srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.word}
              loading="lazy"
            /> */}
            {/* <ImageListItemBar
              title={item.word}
              subtitle={item.textExample}
              // actionIcon={
              //   <IconButton
              //     sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              //     aria-label={`info about ${item.title}`}>
              //     <InfoIcon />
              //   </IconButton>
              // }
            /> */}
          </ImageListItem>
        ))}
      </ImageList>
    );
  }
}

// export function WordCards(group: number, page: number) {

//   return (
//     <ImageList sx={{ width: '50%', height: 450 }}>
//       const api = new ReactLearnWordsAPI();
//     api.getWords(group, page)
//       .then((words) => {
//         words.map((item: IWordCard) => (
//           <ImageListItem key={item.image}>
//             <img
//               src={`${item.image}?w=248&fit=crop&auto=format`}
//               srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
//               alt={item.word}
//               loading="lazy"
//             />
//             <ImageListItemBar
//               title={item.word}
//               subtitle={item.textExample}
//               // actionIcon={
//               //   <IconButton
//               //     sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
//               //     aria-label={`info about ${item.title}`}>
//               //     <InfoIcon />
//               //   </IconButton>
//               // }
//             />
//           </ImageListItem>
//       ))}
//     </ImageList>
//   );
//   }

//   return (
//     <ImageList sx={{ width: '50%', height: 450 }}>
//       {/* {words.map((item: IWordCard) => (
//         <ImageListItem key={item.image}>
//           <img
//             src={`${item.image}?w=248&fit=crop&auto=format`}
//             srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
//             alt={item.word}
//             loading="lazy"
//           />
//           <ImageListItemBar
//             title={item.word}
//             subtitle={item.textExample}
//             // actionIcon={
//             //   <IconButton
//             //     sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
//             //     aria-label={`info about ${item.title}`}>
//             //     <InfoIcon />
//             //   </IconButton>
//             // }
//           />
//         </ImageListItem>
//       ))} */}
//     </ImageList>
//   );
// }
