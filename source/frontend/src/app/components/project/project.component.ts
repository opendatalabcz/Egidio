import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {catchError, filter, first, map, mergeMap, of} from "rxjs";
import {ProjectService} from "../../services/project.service";
import {universalHttpErrorResponseHandler} from "../../utils/error-handling-functions";
import {isNotNullOrUndefined, isNullOrUndefined} from "../../utils/predicates/object-predicates";

@UntilDestroy()
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.activatedRoute.paramMap
      .pipe(
        map(paramMap => paramMap.get('projectSlug')),
        untilDestroyed(this)
      ).subscribe(slug => {
      this.projectService.currentProjectSlug = slug
      if(slug) {
        //TODO: Think about downloading project instead of just asking for its existence,
        // project might exist, but it still might not be accessible to user, so we would be able to check it here
        this.projectService.projectExists(slug)
          .pipe(first())
          .subscribe(exists => {
            console.log(exists)
            if(!exists) {
              this.router.navigate(['/not-found'])
            }
        })
      }
    })
  }
}