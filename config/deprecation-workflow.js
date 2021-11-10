self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "computed-property.override" },
    { handler: "silence", matchId: "ember-views.curly-components.jquery-element" },
    { handler: "silence", matchId: "ember-string.htmlsafe-ishtmlsafe" },
    { handler: "silence", matchId: "computed-property.override" }
  ]
};
