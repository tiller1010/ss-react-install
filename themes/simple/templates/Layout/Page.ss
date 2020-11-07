<%-- <% include SideBar %>
<div class="content-container unit size3of4 lastUnit">
	<article>
		<h1>$Title</h1>
		<div class="content">$Content</div>
	</article>
		$Form
		$CommentsForm
</div> --%>
<% if $Form %>
	<div class="flex x-center">
	    $Form
	</div>
<% end_if %>