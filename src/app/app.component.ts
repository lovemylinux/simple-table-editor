import { Component, Input } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';
import { csvJSON } from './utils'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Test app for Yumasoft';
  inputJSON = '';
  parsedJSON = []
  correct = false;

  isEmpty(){
    return this.inputJSON == ''
  }

  setInputJSON(value: string) {
    this.inputJSON = value
    try {
      this.parsedJSON = JSON.parse(this.inputJSON)
      this.correct = true;
    } catch (error) {
      this.correct = false;
    }
  }

  onInputJSONChange(event) {
    this.setInputJSON(event.target.value)
  }

  get columnNames() {
    return Object.keys(this.parsedJSON[0])
  }

  onChangeElement(parsedJSON, row, columnName, event) {
    row[columnName] = event.target.value
    this.inputJSON = JSON.stringify(parsedJSON)
  }

  handleFileInput(files){
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.setInputJSON(csvJSON(fileReader.result))
    }
    fileReader.readAsText(files[0]);
  }

  exportCSVButton(){
    const options = { 
      title: 'CSV Export',
      useTextFile: false,
      useBom: false,
      useKeysAsHeaders: true,
      quoteStrings: '',
      headers: this.columnNames,
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(this.inputJSON);
  }
}
