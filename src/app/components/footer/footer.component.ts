import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer" >
        <div class="container" style="background-color: black;">

        <ul class="ulList">
          <li><a href="https://www.linkedin.com/in/kohdepitcherkelly">Privacy Policy</a></li>
          <li><a href="https://www.linkedin.com/in/kohdepitcherkelly">Terms of Service</a></li>
          <li><a href="https://www.linkedin.com/in/kohdepitcherkelly">Third Party Notices</a></li>
          <li><a href="https://www.linkedin.com/in/kohdepitcherkelly">FAQ</a></li>
          <!-- <li><a href="https://callaghanpark.com.au">Visit callaghanpark</a></li> -->
        </ul>

        <div class="content has-text-centered">
          <p style="text-align: center;">
            Copyright © Rockhampton Jockey Club 2020 | Designed and developed by <a href="https://www.linkedin.com/in/kohdepitcherkelly">Kohde Pitcher</a>
          </p>
        </div>
        </div>
        </footer>
  `,
  styles: [".ulList{list-style: none;} .ulList > li{display: inline-block; padding-left: 5px; padding-right: 5px;} .ulList > li > a {color: rgba(255,255,255,.5)}"]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
