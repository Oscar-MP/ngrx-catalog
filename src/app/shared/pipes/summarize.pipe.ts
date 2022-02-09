
import { Pipe } from '@angular/core';

@Pipe({
  name: 'summarize'
})
export class SummarizePipe{

    transform (text: string, words: number = 20 ) {
        return text.split(" ").slice(0, words).join(" ") + '...';
    }
}